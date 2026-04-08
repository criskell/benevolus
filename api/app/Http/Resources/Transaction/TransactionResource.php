<?php

declare(strict_types=1);

namespace App\Http\Resources\Transaction;

use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'TransactionResource',
    properties: [
        new OA\Property(property: 'id', type: 'integer'),
        new OA\Property(property: 'campaignId', type: 'integer'),
        new OA\Property(property: 'userId', type: 'integer', nullable: true),
        new OA\Property(property: 'type', type: 'string', enum: ['donation', 'withdrawal', 'dispute', 'adjustment']),
        new OA\Property(property: 'amountCents', type: 'integer'),
        new OA\Property(property: 'direction', type: 'string', enum: ['input', 'output']),
        new OA\Property(property: 'createdAt', type: 'string', format: 'date-time'),
        new OA\Property(property: 'updatedAt', type: 'string', format: 'date-time'),
        new OA\Property(
            property: 'user',
            type: 'object',
            nullable: true,
            properties: [
                new OA\Property(property: 'id', type: 'integer'),
                new OA\Property(property: 'name', type: 'string'),
            ]
        ),
    ]
)]
class TransactionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'campaignId' => $this->campaign_id,
            'userId' => $this->user_id,
            'type' => $this->type,
            'amountCents' => $this->amount_cents,
            'direction' => $this->direction,
            'createdAt' => $this->created_at->toDateTimeString(),
            'updatedAt' => $this->updated_at->toDateTimeString(),
            'user' => $this->whenLoaded('user', fn () => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ]),
        ];
    }
}
