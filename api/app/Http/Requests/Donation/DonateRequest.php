<?php

declare(strict_types=1);

namespace App\Http\Requests\Donation;

use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'DonorRequest',
    required: ['name', 'email', 'taxId', 'phoneNumber'],
    properties: [
        new OA\Property(property: 'name', type: 'string'),
        new OA\Property(property: 'email', type: 'string', format: 'email'),
        new OA\Property(property: 'taxId', type: 'string', pattern: "^\d{3}\.\d{3}\.\d{3}-\d{2}$"),
        new OA\Property(property: 'phoneNumber', type: 'string', pattern: "^\d{10,11}$"),
    ]
)]
#[OA\Schema(
    schema: 'CreditCardRequest',
    required: ['holderName', 'number', 'expiryMonth', 'expiryYear', 'ccv', 'holderEmail', 'holderCpfCnpj', 'holderPostalCode', 'holderAddressNumber', 'holderPhone'],
    properties: [
        new OA\Property(property: 'holderName', type: 'string'),
        new OA\Property(property: 'number', type: 'string'),
        new OA\Property(property: 'expiryMonth', type: 'string'),
        new OA\Property(property: 'expiryYear', type: 'string'),
        new OA\Property(property: 'ccv', type: 'string'),
        new OA\Property(property: 'holderEmail', type: 'string', format: 'email'),
        new OA\Property(property: 'holderCpfCnpj', type: 'string'),
        new OA\Property(property: 'holderPostalCode', type: 'string'),
        new OA\Property(property: 'holderAddressNumber', type: 'string'),
        new OA\Property(property: 'holderPhone', type: 'string'),
    ]
)]
#[OA\Schema(
    schema: 'DonationRequest',
    required: ['amount', 'anonymousDonation', 'donor', 'paymentMethod'],
    properties: [
        new OA\Property(
            property: 'amount',
            type: 'number',
            minimum: 1,
            maximum: 1000000,
        ),
        new OA\Property(property: 'anonymousDonation', type: 'boolean'),
        new OA\Property(property: 'campaignId', type: 'integer', nullable: true),
        new OA\Property(property: 'donor', ref: '#/components/schemas/DonorRequest', type: 'object'),
        new OA\Property(
            property: 'paymentMethod',
            type: 'string',
            enum: ['pix', 'credit_card', 'boleto'],
        ),
        new OA\Property(property: 'creditCard', ref: '#/components/schemas/CreditCardRequest', type: 'object', nullable: true),
    ]
)]
class DonateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'amount' => [
                'required',
                'numeric',
                'min:1',
                'max:1000000',
            ],
            'anonymousDonation' => ['required', 'boolean'],
            'campaignId' => ['nullable', 'exists:campaigns,id'],
            'donor' => ['required', 'array'],
            'donor.name' => ['required', 'string', 'max:255'],
            'donor.taxId' => [
                'required',
                'string',
                'regex:/^\d{3}\.\d{3}.\d{3}/',
            ],
            'donor.phoneNumber' => [
                'required',
                'string',
                'regex:/^\d{10,11}$/',
            ],
            'donor.email' => [
                'required',
                'string',
                'email',
            ],
            'paymentMethod' => [
                'required',
                'string',
                'in:pix,credit_card,boleto',
            ],
            'creditCard' => ['required_if:paymentMethod,credit_card', 'array'],
            'creditCard.holderName' => ['required_if:paymentMethod,credit_card', 'string', 'max:255'],
            'creditCard.number' => ['required_if:paymentMethod,credit_card', 'string'],
            'creditCard.expiryMonth' => ['required_if:paymentMethod,credit_card', 'string'],
            'creditCard.expiryYear' => ['required_if:paymentMethod,credit_card', 'string'],
            'creditCard.ccv' => ['required_if:paymentMethod,credit_card', 'string'],
            'creditCard.holderEmail' => ['required_if:paymentMethod,credit_card', 'string', 'email'],
            'creditCard.holderCpfCnpj' => ['required_if:paymentMethod,credit_card', 'string'],
            'creditCard.holderPostalCode' => ['required_if:paymentMethod,credit_card', 'string'],
            'creditCard.holderAddressNumber' => ['required_if:paymentMethod,credit_card', 'string'],
            'creditCard.holderPhone' => ['required_if:paymentMethod,credit_card', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'amount.required' => 'O valor da doação é obrigatória',
            'amount.min' => 'O valor mínimo é R$ 1,00',
            'amount.max' => 'O valor máximo é R$ 1.000.000,00',
            'donor.name.required' => 'O nome do doador é obrigatório',
            'donor.taxId.regex' => 'CPF inválido (formato: 123.456.789-00)',
            'donor.phoneNumber.regex' => 'Telefone inválido (10-11 dígitos)',
            'payment_method.in' => 'Método de pagamento inválido',
            'campaign_id.exists' => 'Campanha não encontrada',
        ];
    }
}
