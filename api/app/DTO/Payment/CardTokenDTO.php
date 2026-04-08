<?php

declare(strict_types=1);

namespace App\DTO\Payment;

readonly class CardTokenDTO
{
    public function __construct(
        public string $token,
        public string $brand,
        public string $lastFour,
        public string $expMonth,
        public string $expYear,
        public string $holderName,
        public ?string $gatewayCustomerId = null,
        public ?string $billingPostalCode = null,
        public ?string $billingAddressNumber = null,
        public ?string $billingStreet = null,
        public ?string $billingNeighborhood = null,
        public ?string $billingCity = null,
        public ?string $billingState = null,
        public ?string $billingComplement = null,
    ) {}

    public static function from(array $data): self
    {
        return new self(
            token: $data['token'],
            brand: $data['brand'],
            lastFour: $data['lastFour'],
            expMonth: $data['expMonth'],
            expYear: $data['expYear'],
            holderName: $data['holderName'],
            gatewayCustomerId: $data['gatewayCustomerId'] ?? null,
            billingPostalCode: $data['billingPostalCode'] ?? null,
            billingAddressNumber: $data['billingAddressNumber'] ?? null,
            billingStreet: $data['billingStreet'] ?? null,
            billingNeighborhood: $data['billingNeighborhood'] ?? null,
            billingCity: $data['billingCity'] ?? null,
            billingState: $data['billingState'] ?? null,
            billingComplement: $data['billingComplement'] ?? null,
        );
    }
}
