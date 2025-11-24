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

    public static function fromRequest(array $data): self
    {
        return new self(
            amount: $data['amount'],
            anonymousDonation: (bool) $data['anonymousDonation'],
            donor: DonorDTO::fromArray($data['donor']),
            paymentMethod: $data['paymentMethod'],
            campaignId: $data['campaignId'],
        );
    }
}
