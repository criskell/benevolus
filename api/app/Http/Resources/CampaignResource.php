<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "CampaignResource",
    properties: [
        new OA\Property(property: "id", type: "integer"),
        new OA\Property(property: "title", type: "string"),
        new OA\Property(property: "description", type: "string"),
        new OA\Property(property: "goal", type: "number"),
        new OA\Property(property: "raised", type: "string"),
        new OA\Property(property: "status", type: "string"),
    ]
)]
class CampaignResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'goalCents' => $this->goal_cents,
            'amountRaisedCents' => $this->amount_raised_cents,
            'expiresAt' => $this->expires_at?->toDateTimeString(),
            'createdAt' => $this->created_at->toDateTimeString(),
            'updatedAt' => $this->updated_at->toDateTimeString(),
            'status' => $this->status,
            'favoriteCount' => $this->favorites_count ?? 0,
            'comments' => CommentResource::collection($this->whenLoaded('recentComments')),
            'updates' => CampaignUpdateResource::collection($this->whenLoaded('recentUpdates')),
            'donations' => CampaignDonationResource::collection($this->whenLoaded('recentDonations')),
        ];
    }
}
