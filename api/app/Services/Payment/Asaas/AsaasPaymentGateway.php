<?php

declare(strict_types=1);

namespace App\Services\Payment\Asaas;

use App\DTO\Donation\DonationDTO;
use App\Models\User;
use App\Services\Payment\CardTokenizableInterface;
use App\Services\Payment\PaymentGatewayInterface;
use Illuminate\Support\Str;

final class AsaasPaymentGateway implements CardTokenizableInterface, PaymentGatewayInterface
{
    public function __construct(
        private AsaasClient $client,
    ) {}

    public function createPayment(DonationDTO $data): array
    {
        $customer = $this->findOrCreateCustomer($data);
        $externalReference = Str::random(48);

        $payload = [
            'customer' => $customer['id'],
            'billingType' => $this->mapBillingType($data->paymentMethod),
            'value' => $data->amount / 100,
            'dueDate' => now()->format('Y-m-d'),
            'externalReference' => $externalReference,
            'description' => 'Doacao',
        ];

        $charge = $this->client->createPayment($payload);

        $pixCode = null;
        $qrCode = null;

        if ($data->paymentMethod === 'pix') {
            $pixData = $this->client->getPixQrCode($charge['id']);
            $pixCode = $pixData['payload'] ?? null;
            $qrCode = $pixData['encodedImage'] ?? null;
        }

        return [
            'externalReference' => $externalReference,
            'status' => $this->mapStatus($charge['status']),
            'pixCode' => $pixCode,
            'qrCode' => $qrCode,
            'expiresAt' => now()->addHours(24),
            'bankSlipUrl' => $charge['bankSlipUrl'] ?? null,
        ];
    }

    public function getPaymentStatus(string $paymentId): string
    {
        $payment = $this->client->findPaymentByExternalReference($paymentId);

        if (! $payment) {
            return 'pending';
        }

        return $this->mapStatus($payment['status']);
    }

    public function createTokenizationSession(User $user): array
    {
        return [
            'gateway' => 'asaas',
            'clientSecret' => null,
            'customerId' => null,
        ];
    }

    public function createPaymentWithToken(DonationDTO $data, string $token, ?string $customerId): array
    {
        if ($customerId === null) {
            $customer = $this->findOrCreateCustomer($data);
            $customerId = $customer['id'];
        }

        $externalReference = Str::random(48);

        $payload = [
            'customer' => $customerId,
            'billingType' => 'CREDIT_CARD',
            'value' => $data->amount / 100,
            'dueDate' => now()->format('Y-m-d'),
            'externalReference' => $externalReference,
            'description' => 'Doacao',
            'creditCardToken' => $token,
        ];

        $charge = $this->client->createPayment($payload);

        return [
            'externalReference' => $externalReference,
            'status' => $this->mapStatus($charge['status']),
            'pixCode' => null,
            'qrCode' => null,
            'expiresAt' => null,
            'bankSlipUrl' => null,
        ];
    }

    private function findOrCreateCustomer(DonationDTO $data): array
    {
        $cpfCnpj = preg_replace('/\D/', '', $data->donor->taxId);

        $customer = $this->client->findCustomerByCpfCnpj($cpfCnpj);

        if ($customer) {
            return $customer;
        }

        return $this->client->createCustomer([
            'name' => $data->donor->name,
            'cpfCnpj' => $cpfCnpj,
            'email' => $data->donor->email,
            'mobilePhone' => $data->donor->phoneNumber,
            'notificationDisabled' => true,
        ]);
    }

    private function mapBillingType(string $paymentMethod): string
    {
        return match ($paymentMethod) {
            'pix' => 'PIX',
            'credit_card' => 'CREDIT_CARD',
            'boleto' => 'BOLETO',
            default => 'UNDEFINED',
        };
    }

    private function mapStatus(string $asaasStatus): string
    {
        return match ($asaasStatus) {
            'RECEIVED', 'CONFIRMED', 'RECEIVED_IN_CASH' => 'paid',
            'PENDING', 'AWAITING_RISK_ANALYSIS' => 'pending',
            'REFUNDED', 'REFUND_REQUESTED', 'REFUND_IN_PROGRESS' => 'refunded',
            default => 'failed',
        };
    }
}
