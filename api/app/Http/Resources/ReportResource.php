<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
