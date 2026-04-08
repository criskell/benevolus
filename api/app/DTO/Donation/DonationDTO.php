<?php

declare(strict_types=1);

namespace App\DTO\Donation;

use App\DTO\User\DonorDTO;

class DonationDTO
{
    public function __construct(
        public int $amount,
        public bool $anonymousDonation,
        public DonorDTO $donor,
        public string $paymentMethod,
        public ?int $campaignId = null,
        public ?int $paymentMethodId = null,
        public ?string $creditCardToken = null,
    ) {}

    public static function from(array $data): self
    {
        return new self(
            amount: $data['amount'],
            anonymousDonation: (bool) $data['anonymousDonation'],
            paymentMethod: $data['paymentMethod'],
            campaignId: $data['campaignId'] ?? null,
            donor: DonorDTO::from($data['donor']),
            paymentMethodId: $data['paymentMethodId'] ?? null,
            creditCardToken: $data['creditCardToken'] ?? null,
        );
    }
}
