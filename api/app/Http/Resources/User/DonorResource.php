<?php

namespace App\Http\Resources\User;

use OpenApi\Attributes as OA;
use Illuminate\Http\Resources\Json\JsonResource;

#[OA\Schema(
    schema: "DonorResource",
    properties: [
        new OA\Property(property: "id", type: "integer"),
        new OA\Property(property: "name", type: "string"),
    ]
)]
class DonorResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}
