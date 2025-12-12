<?php

namespace App\Http\Resources;

use OpenApi\Attributes as OA;
use Illuminate\Http\Resources\Json\JsonResource;

#[OA\Schema(
    schema: 'AddressResource',
    properties: [
        new OA\Property(property: 'id', type: 'integer'),
        new OA\Property(property: 'street', type: 'string'),
        new OA\Property(property: 'number', type: 'string'),
        new OA\Property(property: 'city', type: 'string'),
        new OA\Property(property: 'state', type: 'string'),
        new OA\Property(property: 'zipcode', type: 'string'),
        new OA\Property(property: 'country', type: 'string'),
    ]
)]
class AddressResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->whenLoaded('address'),
        ];
    }
}
