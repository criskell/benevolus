<?php

declare(strict_types=1);

namespace App\Services\Campaign;

use App\Models\Campaign;
use App\Models\User;
use App\Services\Donation\DonationService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

final class CampaignService
{
    public function __construct(private DonationService $donationService) {}

    public function list(array $filters = []): LengthAwarePaginator
    {
        $query = Campaign::query();

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (! empty($filters['userId'])) {
            $query->where('user_id', $filters['userId']);
        }

        if (! empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'like', '%'.$filters['search'].'%')
                    ->orWhere('description', 'like', '%'.$filters['search'].'%');
            });
        }

        return $query
            ->withCount('donations')
            ->with(['assets' => fn ($q) => $q->limit(1)])
            ->orderBy('created_at', 'desc')
            ->paginate();
    }

    public function findById(int $campaignId): Campaign
    {
        $campaign = Campaign::withCount('favoritedByUsers')
            ->with('user')
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

    public function findBySlug(string $slug): Campaign
    {
        $campaign = Campaign::withCount('favoritedByUsers')
            ->with('user')
            ->where('slug', $slug)
            ->firstOrFail();

        $recentComments = $campaign->comments()
            ->with('user')
            ->latest()
            ->take(15)
            ->get();

        $recentUpdates = $campaign->updates()
            ->latest()
            ->take(15)
            ->get();

        $recentDonations = $this->donationService->findRecentDonations($campaign->id);

        $campaign->setRelation('recentComments', $recentComments);
        $campaign->setRelation('recentUpdates', $recentUpdates);
        $campaign->setRelation('recentDonations', $recentDonations);

        return $campaign;
    }

    public function create(array $data, User $user): Campaign
    {
        $data = $this->mapPersistentEntity($data);
        $data['status'] = Campaign::STATUS_IN_REVIEW;
        $data['slug'] = $this->generateUniqueSlug($data['title']);

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
            'title' => $data['title'] ?? null,
            'description' => $data['description'] ?? null,
            'goal_cents' => $data['goalCents'] ?? null,
            'expires_at' => $data['expiresAt'] ?? null,
            'status' => $data['status'] ?? null,
        ];
    }

    private function generateUniqueSlug(string $title): string
    {
        $slug = Str::slug($title);
        $original = $slug;
        $counter = 1;

        while (Campaign::where('slug', $slug)->exists()) {
            $slug = $original.'-'.$counter;
            $counter++;
        }

        return $slug;
    }
}
