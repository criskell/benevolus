<?php
declare(strict_types=1);

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "UpdateProfileRequest",
    properties: [
        new OA\Property(property: "name", type: "string", maxLength: 255),
        new OA\Property(property: "email", type: "string", format: "email", maxLength: 255),
        new OA\Property(property: "taxId", type: "string", maxLength: 14),
        new OA\Property(property: "birthDate", type: "string", format: "date"),
        new OA\Property(property: "phone", type: "string", maxLength: 20),
        new OA\Property(
            property: "address",
            type: "object",
            properties: [
                new OA\Property(property: "street", type: "string", maxLength: 255),
                new OA\Property(property: "number", type: "string", maxLength: 20),
                new OA\Property(property: "city", type: "string", maxLength: 100),
                new OA\Property(property: "state", type: "string", maxLength: 50),
                new OA\Property(property: "zipcode", type: "string", maxLength: 20),
                new OA\Property(property: "country", type: "string", maxLength: 100),
            ]
        ),
    ]
)]
class UpdateProfileRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $this->user()->id,
            'taxId' => 'sometimes|nullable|string|max:14',
            'birthDate' => 'sometimes|nullable|date',
            'phone' => 'sometimes|nullable|string|max:20',
            'address.street' => 'sometimes|string|max:255',
            'address.number' => 'sometimes|string|max:20',
            'address.city' => 'sometimes|string|max:100',
            'address.state' => 'sometimes|string|max:50',
            'address.zipcode' => 'sometimes|string|max:20',
            'address.country' => 'sometimes|string|max:100',
        ];
    }
}
