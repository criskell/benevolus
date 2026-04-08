<?php

declare(strict_types=1);

namespace App\Http\Resources\Payment;

use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'PaymentMethodResource',
    properties: [
        new OA\Property(property: 'id', type: 'integer'),
        new OA\Property(property: 'brand', type: 'string'),
        new OA\Property(property: 'lastFour', type: 'string'),
        new OA\Property(property: 'expMonth', type: 'string'),
        new OA\Property(property: 'expYear', type: 'string'),
        new OA\Property(property: 'holderName', type: 'string'),
        new OA\Property(
            property: 'billingAddress',
            type: 'object',
            nullable: true,
            properties: [
                new OA\Property(property: 'postalCode', type: 'string', nullable: true),
                new OA\Property(property: 'number', type: 'string', nullable: true),
                new OA\Property(property: 'street', type: 'string', nullable: true),
                new OA\Property(property: 'neighborhood', type: 'string', nullable: true),
                new OA\Property(property: 'city', type: 'string', nullable: true),
                new OA\Property(property: 'state', type: 'string', nullable: true),
                new OA\Property(property: 'complement', type: 'string', nullable: true),
            ]
        ),
        new OA\Property(property: 'isDefault', type: 'boolean'),
        new OA\Property(property: 'createdAt', type: 'string', format: 'date-time'),
    ]
)]
class PaymentMethodResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'brand' => $this->brand,
            'lastFour' => $this->last_four,
            'expMonth' => $this->exp_month,
            'expYear' => $this->exp_year,
            'holderName' => $this->holder_name,
            'billingAddress' => [
                'postalCode' => $this->billing_postal_code,
                'number' => $this->billing_address_number,
                'street' => $this->billing_street,
                'neighborhood' => $this->billing_neighborhood,
                'city' => $this->billing_city,
                'state' => $this->billing_state,
                'complement' => $this->billing_complement,
            ],
            'isDefault' => $this->is_default,
            'createdAt' => $this->created_at,
        ];
    }
}
