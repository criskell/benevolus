<?php

declare(strict_types=1);

namespace App\Http\Resources\Campaign;

use App\Http\Resources\Comment\CommentResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'CampaignResource',
    type: 'object',
    properties: [
        new OA\Property(property: 'id', type: 'integer'),
        new OA\Property(property: 'slug', type: 'string'),
        new OA\Property(property: 'title', type: 'string'),
        new OA\Property(property: 'description', type: 'string'),
        new OA\Property(property: 'goalCents', type: 'integer'),
        new OA\Property(property: 'amountRaisedCents', type: 'integer'),
        new OA\Property(property: 'expiresAt', type: 'string', format: 'date-time', nullable: true),
        new OA\Property(property: 'createdAt', type: 'string', format: 'date-time'),
        new OA\Property(property: 'updatedAt', type: 'string', format: 'date-time'),
        new OA\Property(property: 'status', type: 'string'),
        new OA\Property(property: 'donationsCount', type: 'integer'),
        new OA\Property(property: 'favoriteCount', type: 'integer'),
        new OA\Property(property: 'image', type: 'string', nullable: true),
        new OA\Property(
            property: 'comments',
            type: 'array',
            items: new OA\Items(ref: '#/components/schemas/CommentResource')
        ),
        new OA\Property(
            property: 'updates',
            type: 'array',
            items: new OA\Items(ref: '#/components/schemas/CampaignUpdateResource')
        ),
        new OA\Property(
            property: 'donations',
            type: 'array',
            items: new OA\Items(ref: '#/components/schemas/CampaignDonationResource')
        ),
    ]
)]
class CampaignResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'description' => $this->description,
            'goalCents' => $this->goal_cents,
            'amountRaisedCents' => $this->amount_raised_cents,
            'expiresAt' => $this->expires_at?->toDateTimeString(),
            'createdAt' => $this->created_at->toDateTimeString(),
            'updatedAt' => $this->updated_at->toDateTimeString(),
            'status' => $this->status,
            'donationsCount' => $this->donations_count ?? 0,
            'image' => $this->whenLoaded('assets', fn () => $this->assets->first()?->url),
            'favoriteCount' => $this->favorites_count ?? 0,
            'comments' => CommentResource::collection($this->whenLoaded('recentComments')),
            'updates' => CampaignUpdateResource::collection($this->whenLoaded('recentUpdates')),
            'donations' => CampaignDonationResource::collection($this->whenLoaded('recentDonations')),
        ];
    }
}
