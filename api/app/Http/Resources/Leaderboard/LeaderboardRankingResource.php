<?php

namespace App\Http\Resources\Leaderboard;

use App\Models\Campaign;
use Illuminate\Http\Resources\Json\JsonResource;

class LeaderboardRankingResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->when($this->resource instanceof Campaign, $this->id),
            'name' => $this->name ?? $this->title ?? null,
            'totalDonated' => $this->when(!!$this->donations_sum_amount_cents, $this->donations_sum_amount_cents),
            'totalCampaigns' => $this->when(!!$this->campaigns_count, $this->campaigns_count),
        ];
    }
}
