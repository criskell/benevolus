<?php

declare(strict_types=1);

namespace App\Services\Payment\Asaas;

use App\Exceptions\PaymentException;
use Illuminate\Support\Facades\Http;

class AsaasClient
{
    public function __construct(
        private string $apiKey,
        private string $baseUrl,
    ) {}

    public function createCustomer(array $data): array
    {
        return $this->post('/customers', $data);
    }

    public function findCustomerByCpfCnpj(string $cpfCnpj): ?array
    {
        $response = $this->get('/customers', ['cpfCnpj' => $cpfCnpj]);

        return ! empty($response['data']) ? $response['data'][0] : null;
    }

    public function createPayment(array $data): array
    {
        return $this->post('/payments', $data);
    }

    public function getPayment(string $id): array
    {
        return $this->get("/payments/{$id}");
    }

    public function getPixQrCode(string $paymentId): array
    {
        return $this->get("/payments/{$paymentId}/pixQrCode");
    }

    public function createWebhook(array $data): array
    {
        return $this->post('/webhooks', $data);
    }

    public function findPaymentByExternalReference(string $externalReference): ?array
    {
        $response = $this->get('/payments', ['externalReference' => $externalReference]);

        return ! empty($response['data']) ? $response['data'][0] : null;
    }

    private function get(string $path, array $query = []): array
    {
        $response = Http::withHeaders([
            'access_token' => $this->apiKey,
        ])->get($this->baseUrl.$path, $query);

        if ($response->failed()) {
            throw PaymentException::processingFailed(
                "Asaas API error: {$response->body()}",
                ['status' => $response->status(), 'path' => $path]
            );
        }

        return $response->json();
    }

    private function post(string $path, array $data): array
    {
        $response = Http::withHeaders([
            'access_token' => $this->apiKey,
        ])->post($this->baseUrl.$path, $data);

        if ($response->failed()) {
            throw PaymentException::processingFailed(
                "Asaas API error: {$response->body()}",
                ['status' => $response->status(), 'path' => $path]
            );
        }

        return $response->json();
    }
}
