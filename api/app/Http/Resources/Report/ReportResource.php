<?php

namespace App\Http\Resources\Report;

use App\Http\Resources\Campaign\CampaignResource;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "ReportResource",
    properties: [
        new OA\Property(property: "id", type: "integer"),
        new OA\Property(property: "reason", type: "string"),
        new OA\Property(property: "description", type: "string"),
        new OA\Property(property: "createdAt", type: "string", format: "date-time"),
        new OA\Property(
            property: "campaign",
            ref: "#/components/schemas/CampaignResource",
            type: "object",
            nullable: true
        ),
        new OA\Property(
            property: "user",
            ref: "#/components/schemas/UserResource",
            type: "object",
            nullable: true
        ),
    ]
)]
class ReportResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'campaign' => new CampaignResource($this->whenLoaded('campaign')),
            'user' => new UserResource($this->whenLoaded('user')),
            'reason' => $this->reason,
            'description' => $this->description,
            'createdAt' => $this->created_at,
        ];
    }
}
