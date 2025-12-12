<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WithdrawalResource extends JsonResource
{
    public function toArray($request)
    {
        $paidAt = $this->paid_at ?? null;

        return [
            'id' => $this->id,
            'campaignId' => $this->campaign_id,
            'amountCents' => $this->amountCents,
            'status' => $this->status,
            'pixKey' => $this->pix_key,
            'pixKeyType' => $this->pix_key_type,
            'paidAt' => $paidAt?->toDateTimeString(),
            'createdAt' => $this->created_at->toDateTimeString(),
            'updatedAt' => $this->updated_at->toDateTimeString(),
            'campaign' => $this->whenLoaded('campaign'),
        ];
    }
}
