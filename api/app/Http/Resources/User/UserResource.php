<?php
declare(strict_types=1);

namespace App\Http\Resources\User;

use OpenApi\Attributes as OA;
use Illuminate\Http\Resources\Json\JsonResource;

#[OA\Schema(
    schema: "UserResource",
    properties: [
        new OA\Property(property: "id", type: "integer"),
        new OA\Property(property: "name", type: "string"),
        new OA\Property(
            property: "address",
            type: "object",
            nullable: true,
            properties: [
                new OA\Property(property: "street", type: "string", nullable: true),
                new OA\Property(property: "number", type: "string", nullable: true),
                new OA\Property(property: "city", type: "string", nullable: true),
                new OA\Property(property: "state", type: "string", nullable: true),
                new OA\Property(property: "zipcode", type: "string", nullable: true),
                new OA\Property(property: "country", type: "string", nullable: true),
            ]
        ),
    ]
)]
class UserResource extends JsonResource
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
