<?php
declare(strict_types=1);

namespace App\Http\Resources\Leaderboard;

use App\Models\Campaign;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "LeaderboardRankingResource",
    properties: [
        new OA\Property(property: "id", type: "integer", nullable: true),
        new OA\Property(property: "name", type: "string", nullable: true),
        new OA\Property(property: "totalDonated", type: "integer", nullable: true, description: "Total donated in cents"),
        new OA\Property(property: "totalCampaigns", type: "integer", nullable: true),
    ]
)]
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
