<?php

namespace App\Services\Report;

use App\Models\Campaign;
use App\Models\Report;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

final class ReportService
{
    public function list(int $perPage = 30): LengthAwarePaginator
    {
        return Report::with(['campaign', 'user'])
            ->latest()
            ->paginate($perPage);
    }

    public function create(User $user, Campaign $campaign, array $data): Report
    {
        return $user->reports()->create($data + [
            'campaign_id' => $campaign->id,
        ]);
    }
}
