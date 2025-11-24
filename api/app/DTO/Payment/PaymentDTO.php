<?php

namespace App\DTO\Payment;

readonly class PaymentDTO
{
    public function __construct(
        public string $method,
        public string $status,
        public ?string $pixCode = null,
        public ?string $qrCode = null,
        public ?string $expiresAt = null
    ) {}

    public static function fromDonationRequest(array $result): self
    {
        return new self(
            method: $result['donation']->payment_method,
            status: $result['donation']->payment_status,
            pixCode: $result['payment']['pix_code'] ?? null,
            qrCode: $result['payment']['qr_code'] ?? null,
            expiresAt: $result['payment']['expires_at'] ?? null,
        );
    }
}
