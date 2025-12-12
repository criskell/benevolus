<?php

namespace App\Services;

use App\Models\Campaign;
use App\Models\User;
use Illuminate\Support\Collection;

final class LeaderboardService
{
    public function getTopCampaigns(int $limit): Collection
    {
        $query = Campaign::query();
        $this->scopePaidDonationsSum($query);

        return $query->orderByDesc('donations_sum_amount_cents')
            ->take($limit)
            ->get();
    }

    public function getTopDonors(int $limit): Collection
    {
        $query = User::query();
        $this->scopePaidDonationsSum($query);

        return $query->orderByDesc('donations_sum_amount_cents')
            ->take($limit)
            ->get();
    }

    public function getTopCreators(int $limit): Collection
    {
        return User::withCount('campaigns')
            ->orderByDesc('campaigns_count')
            ->take($limit)
            ->get();
    }

    public function scopePaidDonationsSum($query)
    {
        return $query->withSum(
            ['donations as donations_sum_amount_cents' => function ($query) {
                $query->where('payment_status', 'paid');
            }],
            'amount_cents'
        );
    }
}
