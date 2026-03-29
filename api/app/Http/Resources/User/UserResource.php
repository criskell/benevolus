<?php

declare(strict_types=1);

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'UserResource',
    properties: [
        new OA\Property(property: 'id', type: 'integer'),
        new OA\Property(property: 'name', type: 'string'),
        new OA\Property(property: 'email', type: 'string', format: 'email'),
        new OA\Property(property: 'taxId', type: 'string', nullable: true),
        new OA\Property(property: 'birthDate', type: 'string', format: 'date', nullable: true),
        new OA\Property(property: 'phone', type: 'string', nullable: true),
        new OA\Property(property: 'avatarUrl', type: 'string', nullable: true),
        new OA\Property(property: 'favoriteCampaignsCount', type: 'integer', nullable: true),
        new OA\Property(property: 'donationsCount', type: 'integer', nullable: true),
        new OA\Property(
            property: 'address',
            type: 'object',
            nullable: true,
            properties: [
                new OA\Property(property: 'street', type: 'string', nullable: true),
                new OA\Property(property: 'number', type: 'string', nullable: true),
                new OA\Property(property: 'city', type: 'string', nullable: true),
                new OA\Property(property: 'state', type: 'string', nullable: true),
                new OA\Property(property: 'zipcode', type: 'string', nullable: true),
                new OA\Property(property: 'country', type: 'string', nullable: true),
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
            'email' => $this->email,
            'taxId' => $this->tax_id,
            'birthDate' => $this->birth_date?->format('Y-m-d'),
            'phone' => $this->phone,
            'avatarUrl' => $this->avatar_url,
            'favoriteCampaignsCount' => $this->when(
                isset($this->resource->favorite_campaigns_count),
                $this->resource->favorite_campaigns_count
            ),
            'donationsCount' => $this->when(
                isset($this->resource->donations_count),
                $this->resource->donations_count
            ),
            'address' => $this->whenLoaded('address'),
        ];
    }
}
