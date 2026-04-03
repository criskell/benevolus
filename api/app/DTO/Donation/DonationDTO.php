<?php

declare(strict_types=1);

namespace App\DTO\Donation;

use App\DTO\Payment\CreditCardDTO;
use App\DTO\User\DonorDTO;

class DonationDTO
{
    public function __construct(
        public int $amount,
        public bool $anonymousDonation,
        public DonorDTO $donor,
        public string $paymentMethod,
        public ?int $campaignId = null,
        public ?CreditCardDTO $creditCard = null,
    ) {}

    public static function from(array $data): self
    {
        $creditCard = null;

        if (($data['paymentMethod'] ?? '') === 'credit_card' && ! empty($data['creditCard'])) {
            $creditCard = CreditCardDTO::from($data['creditCard']);
        }

        return new self(
            amount: $data['amount'],
            anonymousDonation: (bool) $data['anonymousDonation'],
            paymentMethod: $data['paymentMethod'],
            campaignId: $data['campaignId'],
            donor: DonorDTO::from($data['donor']),
            creditCard: $creditCard,
        );
    }
}
