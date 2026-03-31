<?php

declare(strict_types=1);

namespace App\Http\Requests\Donation;

use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'ThankDonorRequest',
    required: ['message'],
    properties: [
        new OA\Property(property: 'message', type: 'string', minLength: 10, maxLength: 2000),
    ]
)]
class ThankDonorRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'message' => ['required', 'string', 'min:10', 'max:2000'],
        ];
    }
}
