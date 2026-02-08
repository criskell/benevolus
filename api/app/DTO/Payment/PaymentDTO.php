<?php
declare(strict_types=1);

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
            pixCode: $result['payment']['pixCode'] ?? null,
            qrCode: $result['payment']['qrCode'] ?? null,
            expiresAt: $result['payment']['expiresAt'] ?? null,
        );
    }
}
