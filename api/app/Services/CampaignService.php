<?php

namespace App\Services;

use App\Models\Campaign;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CampaignService
{
    public function list(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = Campaign::query();

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'like', '%' . $filters['search'] . '%')
                    ->orWhere('description', 'like', '%' . $filters['search'] . '%');
            });
        }

        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function create(User $user, array $data): Campaign
    {
        return $user->campaigns()->create($data);
    }

    public function update(Campaign $campaign, array $data): Campaign
    {
        if (isset($data['goalCents'])) {
            $data['goal_cents'] = $data;
            unset($data['goal_cents']);
        }

        $campaign->update($data);

        return $campaign;
    }

    public function find(int $id): ?Campaign
    {
        return Campaign::find($id);
    }

    public function delete(Campaign $campaign): void
    {
        $campaign->delete();
    }
}
