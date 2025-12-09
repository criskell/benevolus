<?php

namespace App\Services;

use App\DTO\Donation\DonationDTO;
use App\DTO\Payment\PaymentDTO;
use App\Events\DonationCreated;
use App\Models\Donation;
use Exception;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\ConnectionInterface;
use Psr\Log\LoggerInterface;

class DonationProcessor
{
    public function __construct(
        private UserService $userService,
        private DonationService $donationService,
        private TransactionService $transactionService,
        private PaymentProcessorInterface $paymentProcessor,
        private ConnectionInterface $db,
        private LoggerInterface $logger,
        private Dispatcher $events
    ) {}

    public function process(DonationDTO $data): array
    {
        return $this->db->transaction(function () use ($data) {
            $user = $this->userService->findOrCreateDonor($data->donor);

            $paymentResult = $this->paymentProcessor->createPayment($data);

            $donation = $this->donationService->createFromPayment(
                user: $user,
                amount: $data->amount,
                paymentMethod: $data->paymentMethod,
                paymentId: $paymentResult['payment_id'],
                campaignId: $data->campaignId,
                isAnonymous: $data->anonymousDonation
            );

            $transaction = $this->transactionService->createFromDonation(
                donation: $donation,
                user: $user
            );

            $this->events->dispatch(new DonationCreated($donation));

            $this->logger->info('Donation processed successfully', [
                'donation_id' => $donation->id,
                'user_id' => $user->id,
                'amount' => $donation->amount,
                'payment_id' => $paymentResult['payment_id']
            ]);

            return [
                'donation' => $donation->load(['user', 'campaign']),
                'transaction' => $transaction,
                'payment' => PaymentDTO::fromDonationRequest([
                    'donation' => $donation,
                    'payment' => $paymentResult,
                ]),
            ];
        });
    }

    public function confirmPayment(string $externalReferenceId): Donation
    {
        return $this->db->transaction(function () use ($externalReferenceId) {
            $donation = $this->donationService->findByExternalReference($externalReferenceId);

            if (!$donation) {
                throw new Exception('Donation not found: ' . $externalReferenceId);
            }

            $status = $this->paymentProcessor->getPaymentStatus($externalReferenceId);

            if ($status == 'successed' || $status == 'paid') {
                $donation = $this->donationService->markAsPaid($donation);

                $this->logger->info('Donation payment confirmed', [
                    'donation_id' => $donation->id,
                    'external_reference' => $externalReferenceId
                ]);

                return $donation;
            }

            $this->donationService->updateStatus($donation, $status);

            $this->logger->warning('Donation payment not confirmed', [
                'donation_id' => $donation->id,
                'status' => $status,
            ]);

            return $donation;
        });
    }
}
