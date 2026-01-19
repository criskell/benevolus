<?php

namespace App\Services\Donation;

use App\DTO\Donation\DonationDTO;
use App\DTO\Payment\PaymentDTO;
use App\Models\Donation;
use App\Services\Payment\PaymentGatewayInterface;
use App\Services\Transaction\TransactionService;
use App\Services\User\UserService;
use Exception;
use Illuminate\Database\ConnectionInterface;
use Psr\Log\LoggerInterface;

final class DonationProcessor
{
    public function __construct(
        private UserService $userService,
        private DonationService $donationService,
        private TransactionService $transactionService,
        private PaymentGatewayInterface $paymentGateway,
        private ConnectionInterface $db,
        private LoggerInterface $logger,
    ) {}

    public function process(DonationDTO $data): array
    {
        return $this->db->transaction(function () use ($data) {
            $user = $this->userService->findOrCreateDonor($data->donor);
            $paymentResult = $this->paymentGateway->createPayment($data);
            $donation = $this->donationService->createFromPayment(
                user: $user,
                amount: $data->amount,
                paymentMethod: $data->paymentMethod,
                externalReference: $paymentResult['externalReference'],
                campaignId: $data->campaignId,
                isAnonymous: $data->anonymousDonation
            );
            $transaction = $this->transactionService->createFromDonation(
                donation: $donation,
                user: $user
            );

            $this->logger->info('Donation created successfully', [
                'donationId' => $donation->id,
                'userId' => $user->id,
                'amount' => $donation->amount,
                'externalReference' => $paymentResult['externalReference']
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

            $status = $this->paymentGateway->getPaymentStatus($externalReferenceId);

            if ($status == 'successed' || $status == 'paid') {
                $donation = $this->donationService->markAsPaid($donation);

                $this->logger->info('Donation payment confirmed', [
                    'donationId' => $donation->id,
                    'externalReference' => $externalReferenceId
                ]);

                return $donation;
            }

            $this->donationService->updateStatus($donation, $status);

            $this->logger->warning('Donation payment not confirmed', [
                'donationId' => $donation->id,
                'status' => $status,
            ]);

            return $donation;
        });
    }
}
