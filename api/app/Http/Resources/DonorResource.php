<?php

namespace App\Http\Resources;

use OpenApi\Attributes as OA;
use Illuminate\Http\Resources\Json\JsonResource;

#[OA\Schema(
    schema: "DonorResource",
    properties: [
        new OA\Property(property: "id", type: "integer"),
        new OA\Property(property: "name", type: "string"),
        new OA\Property(property: "email", type: "string"),
        new OA\Property(property: "taxId", type: "string"),
        new OA\Property(property: "phoneNumber", type: "string"),
    ]
)]
class DonorResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'taxId' => $this->tax_id,
            'phoneNumber' => $this->phone_number,
        ];
    }
}
