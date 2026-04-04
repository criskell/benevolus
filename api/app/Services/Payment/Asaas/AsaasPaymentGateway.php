<?php

declare(strict_types=1);

namespace App\Services\Payment\Asaas;

use App\DTO\Donation\DonationDTO;
use App\Services\Payment\PaymentGatewayInterface;
use Illuminate\Support\Str;

final class AsaasPaymentGateway implements PaymentGatewayInterface
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

        if ($data->paymentMethod === 'credit_card' && $data->creditCard !== null) {
            $payload = array_merge($payload, $data->creditCard->toAsaasPayload());
        }

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
