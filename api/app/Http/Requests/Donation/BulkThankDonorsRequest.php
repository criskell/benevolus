<?php

declare(strict_types=1);

namespace App\Http\Requests\Donation;

use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'BulkThankDonorsRequest',
    required: ['message', 'donationIds'],
    properties: [
        new OA\Property(property: 'message', type: 'string', minLength: 10, maxLength: 2000),
        new OA\Property(
            property: 'donationIds',
            type: 'array',
            items: new OA\Items(type: 'integer')
        ),
    ]
)]
class BulkThankDonorsRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'message' => ['required', 'string', 'min:10', 'max:2000'],
            'donationIds' => ['required', 'array', 'min:1'],
            'donationIds.*' => ['required', 'integer', 'exists:donations,id'],
        ];
    }
}
