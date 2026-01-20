<?php

namespace App\Http\Resources\Campaign;

use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "CampaignMediaAssetResource",
    properties: [
        new OA\Property(property: "id", type: "integer"),
        new OA\Property(property: "path", type: "string"),
        new OA\Property(property: "url", type: "string"),
        new OA\Property(property: "createdAt", type: "string", format: "date-time"),
    ]
)]
class CampaignMediaAssetResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'path' => $this->path,
            'url' => $this->url,
            'createdAt' => $this->created_at,
        ];
    }
}
