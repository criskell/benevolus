<?php

namespace App\Services\Campaign;

use App\Models\Campaign;
use App\Models\User;
use App\Services\Donation\DonationService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

final class CampaignService
{
    public function __construct(private DonationService $donationService) {}

    public function list(array $filters = []): LengthAwarePaginator
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

        return $query->orderBy('created_at', 'desc')->paginate();
    }

    public function findById(int $campaignId): Campaign
    {
        $campaign = Campaign::withCount('favoritedByUsers')
            ->findOrFail($campaignId);

        $recentComments = $campaign->comments()
            ->with('user')
            ->latest()
            ->take(15)
            ->get();

        $recentUpdates = $campaign->updates()
            ->latest()
            ->take(15)
            ->get();

        $recentDonations = $this->donationService->findRecentDonations($campaignId);

        $campaign->setRelation('recentComments', $recentComments);
        $campaign->setRelation('recentUpdates', $recentUpdates);
        $campaign->setRelation('recentDonations', $recentDonations);

        return $campaign;
    }

    public function create(array $data, User $user): Campaign
    {
        $data = $this->mapPersistentEntity($data);

        return $user->campaigns()->create($data)->refresh();
    }

    public function update(Campaign $campaign, array $data): Campaign
    {
        $data = $this->mapPersistentEntity($data);
        $campaign->update($data);

        return $campaign;
    }

    public function delete(Campaign $campaign): void
    {
        $campaign->delete();
    }

    private function mapPersistentEntity(array $data): array
    {
        return [
            'title' => $data['title'],
            'description' => $data['description'],
            'goal_cents' => $data['goalCents'],
            'expires_at' => $data['expiresAt'],
        ];
    }
}
