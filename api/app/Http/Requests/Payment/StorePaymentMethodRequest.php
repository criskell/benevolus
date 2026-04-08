<?php

declare(strict_types=1);

namespace App\Http\Requests\Payment;

use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'StorePaymentMethodRequest',
    required: ['token', 'brand', 'lastFour', 'expMonth', 'expYear', 'holderName'],
    properties: [
        new OA\Property(property: 'token', type: 'string', description: 'Gateway token from client-side tokenization'),
        new OA\Property(property: 'brand', type: 'string'),
        new OA\Property(property: 'lastFour', type: 'string', maxLength: 4, minLength: 4),
        new OA\Property(property: 'expMonth', type: 'string', maxLength: 2, minLength: 2),
        new OA\Property(property: 'expYear', type: 'string', maxLength: 4, minLength: 4),
        new OA\Property(property: 'holderName', type: 'string'),
        new OA\Property(property: 'gatewayCustomerId', type: 'string', nullable: true, description: 'Gateway customer ID from tokenization session'),
        new OA\Property(property: 'billingPostalCode', type: 'string', nullable: true),
        new OA\Property(property: 'billingAddressNumber', type: 'string', nullable: true),
        new OA\Property(property: 'billingStreet', type: 'string', nullable: true),
        new OA\Property(property: 'billingNeighborhood', type: 'string', nullable: true),
        new OA\Property(property: 'billingCity', type: 'string', nullable: true),
        new OA\Property(property: 'billingState', type: 'string', nullable: true),
        new OA\Property(property: 'billingComplement', type: 'string', nullable: true),
    ]
)]
class StorePaymentMethodRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'token' => ['required', 'string', 'max:500'],
            'brand' => ['required', 'string', 'max:50'],
            'gatewayCustomerId' => ['nullable', 'string', 'max:255'],
            'lastFour' => ['required', 'string', 'size:4'],
            'expMonth' => ['required', 'string', 'size:2'],
            'expYear' => ['required', 'string', 'size:4'],
            'holderName' => ['required', 'string', 'max:255'],
            'billingPostalCode' => ['nullable', 'string', 'max:20'],
            'billingAddressNumber' => ['nullable', 'string', 'max:20'],
            'billingStreet' => ['nullable', 'string', 'max:255'],
            'billingNeighborhood' => ['nullable', 'string', 'max:255'],
            'billingCity' => ['nullable', 'string', 'max:255'],
            'billingState' => ['nullable', 'string', 'max:255'],
            'billingComplement' => ['nullable', 'string', 'max:255'],
        ];
    }
}
