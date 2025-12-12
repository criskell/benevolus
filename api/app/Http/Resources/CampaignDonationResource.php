<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

class CampaignDonationResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'donor_name' => $this->user->name,
            'amount_cents' => $this->amount_cents,
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
