<?php
declare(strict_types=1);

namespace App\Http\Resources\Campaign;

use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "CampaignUpdateResource",
    properties: [
        new OA\Property(property: "id", type: "integer"),
        new OA\Property(property: "campaignId", type: "integer"),
        new OA\Property(property: "title", type: "string"),
        new OA\Property(property: "content", type: "string"),
        new OA\Property(property: "visibleToDonorsOnly", type: "boolean"),
        new OA\Property(property: "createdAt", type: "string", format: "date-time"),
        new OA\Property(property: "updatedAt", type: "string", format: "date-time"),
    ]
)]
class CampaignUpdateResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'campaignId' => $this->campaign_id,
            'title' => $this->title,
            'content' => $this->content,
            'visibleToDonorsOnly' => $this->visible_to_donors_only,
            'createdAt' => $this->created_at->toDateTimeString(),
            'updatedAt' => $this->updated_at->toDateTimeString(),
        ];
    }
}
