<?php

namespace App\DTO\User;

readonly class DonorDTO
{
    public function __construct(public string $name, public string $email, public string $taxId, public string $phoneNumber) {}

    public static function from(array $data): self
    {
        return new self(
            name: $data['name'],
            email: $data['email'],
            taxId: $data['taxId'],
            phoneNumber: $data['phoneNumber'],
        );
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'taxId' => $this->taxId,
            'phoneNumber' => $this->phoneNumber
        ];
    }
}
