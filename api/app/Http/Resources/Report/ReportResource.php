<?php

namespace App\Http\Resources\Report;

use App\Http\Resources\Campaign\CampaignResource;
use App\Http\Resources\User\UserResource;
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
