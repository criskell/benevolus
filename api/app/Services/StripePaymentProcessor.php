<?php

namespace App\Services;

use App\DTO\Donation\DonationDTO;
use App\DTO\User\DonorDTO;
use App\Exceptions\PaymentException;
use App\Services\PaymentProcessorInterface;
use Stripe\Customer;
use Stripe\Exception\ApiErrorException;
use Stripe\PaymentIntent;
use Stripe\StripeClient;

class StripePaymentProcessor implements PaymentProcessorInterface
{
    private StripeClient $stripe;

    public function __construct()
    {
        $this->stripe = new StripeClient(config('services.stripe.secret'));
    }

    public function createPayment(DonationDTO $data): array
    {
        try {
            $customer = $this->findOrCreateCustomer($data->donor);

            $paymentIntent = $this->stripe->paymentIntents->create([
                'amount' => $this->convertToStripeAmount($data->amount),
                'currency' => 'brl',
                'customer' => $customer->id,
                'payment_method_types' => ['pix'],
                'metadata' => [
                    'donor_name' => $data->donor->name,
                    'donor_tax_id' => $data->donor->taxId,
                    'anonymous' => $data->anonymousDonation ? 'true' : 'false',
                    'campaign_id' => $data->campaignId,
                ],
            ]);

            $confirmedIntent = $this->stripe->paymentIntents->confirm(
                $paymentIntent->id,
                ['return_url' => config('app.url') . '/donation/success']
            );

            return [
                'paymentId' => $paymentIntent->id,
                'status' => $paymentIntent->status,
                'pixCode' => $this->extractPixCode($confirmedIntent),
                'qrCode' => $this->extractQrCodeUrl($confirmedIntent),
                'expiresAt' => now()->addHours(24),
            ];
        } catch (ApiErrorException $e) {
            throw PaymentException::processingFailed($e->getMessage());
        }
    }

    public function getPaymentStatus(string $paymentId): string
    {
        try {
            $paymentIntent = $this->stripe->paymentIntents->retrieve($paymentId);
            return $paymentIntent->status;
        } catch (ApiErrorException $e) {
            throw PaymentException::processingFailed($e->getMessage());
        }
    }

    private function findOrCreateCustomer(DonorDTO $donor): Customer
    {
        $customers = $this->stripe->customers->search([
            'query' => "metadata['tax_id']:'{$donor->taxId}'",
        ]);

        if (count($customers->data) > 0) {
            return $customers->data[0];
        }

        return $this->stripe->customers->create([
            'name' => $donor->name,
            'phone' => $this->formatPhoneNumber($donor->phoneNumber),
            'metadata' => [
                'tax_id' => $donor->taxId,
            ],
        ]);
    }

    private function convertToStripeAmount(float $amount): int
    {
        return (int) ($amount * 100);
    }

    private function formatPhoneNumber(string $phoneNumber): string
    {
        return '+55' . preg_replace('/\D/', '', $phoneNumber);
    }

    private function extractPixCode(PaymentIntent $paymentIntent): ?string
    {
        if (isset($paymentIntent->next_action->pix_display_qr_code->data)) {
            return $paymentIntent->next_action->pix_display_qr_code->data;
        }

        return null;
    }

    private function extractQrCodeUrl(PaymentIntent $paymentIntent): ?string
    {
        if (isset($paymentIntent->next_action->pix_display_qr_code->hosted_instructions_url)) {
            return $paymentIntent->next_action->pix_display_qr_code->hosted_instructions_url;
        }

        return null;
    }
}
