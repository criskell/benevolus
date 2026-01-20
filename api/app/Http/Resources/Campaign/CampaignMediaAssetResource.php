<?php

namespace App\Http\Resources\Campaign;

use Illuminate\Http\Resources\Json\JsonResource;

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
