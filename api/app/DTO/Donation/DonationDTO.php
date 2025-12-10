<?php

namespace App\DTO\Donation;

use App\DTO\User\DonorDTO;

class DonationDTO
{
    public function __construct(
        public int $amount,
        public bool $anonymousDonation,
        public DonorDTO $donor,
        public string $paymentMethod,
        public ?int $campaignId = null
    ) {}

    public static function from(array $data): self
    {
        return new self(
            amount: $data['amount'],
            anonymousDonation: (bool) $data['anonymousDonation'],
            paymentMethod: $data['paymentMethod'],
            campaignId: $data['campaignId'],
            donor: DonorDTO::from($data['donor']),
        );
    }
}
