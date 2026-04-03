<?php

declare(strict_types=1);

namespace App\DTO\Payment;

readonly class CreditCardDTO
{
    public function __construct(
        public string $holderName,
        public string $number,
        public string $expiryMonth,
        public string $expiryYear,
        public string $ccv,
        public string $holderEmail,
        public string $holderCpfCnpj,
        public string $holderPostalCode,
        public string $holderAddressNumber,
        public string $holderPhone,
    ) {}

    public static function from(array $data): self
    {
        return new self(
            holderName: $data['holderName'],
            number: $data['number'],
            expiryMonth: $data['expiryMonth'],
            expiryYear: $data['expiryYear'],
            ccv: $data['ccv'],
            holderEmail: $data['holderEmail'],
            holderCpfCnpj: $data['holderCpfCnpj'],
            holderPostalCode: $data['holderPostalCode'],
            holderAddressNumber: $data['holderAddressNumber'],
            holderPhone: $data['holderPhone'],
        );
    }

    public function toAsaasPayload(): array
    {
        return [
            'creditCard' => [
                'holderName' => $this->holderName,
                'number' => $this->number,
                'expiryMonth' => $this->expiryMonth,
                'expiryYear' => $this->expiryYear,
                'ccv' => $this->ccv,
            ],
            'creditCardHolderInfo' => [
                'name' => $this->holderName,
                'email' => $this->holderEmail,
                'cpfCnpj' => $this->holderCpfCnpj,
                'postalCode' => $this->holderPostalCode,
                'addressNumber' => $this->holderAddressNumber,
                'phone' => $this->holderPhone,
            ],
        ];
    }
}
