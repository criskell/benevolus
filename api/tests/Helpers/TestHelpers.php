<?php

namespace Tests\Helpers;

use App\Models\Campaign;
use App\Models\Donation;
use App\Models\User;

class TestHelpers
{
    public static function createCampaignWithDonations(User $user, int $donationCount = 3, array $campaignAttributes = []): Campaign
    {
        $campaign = Campaign::factory()
            ->for($user)
            ->approved()
            ->create($campaignAttributes);

        Donation::factory()
            ->count($donationCount)
            ->for($campaign)
            ->paid()
            ->create();

        return $campaign->fresh();
    }

    public static function createUserWithCampaigns(int $campaignCount = 2, array $userAttributes = []): User
    {
        $user = User::factory()->create($userAttributes);

        Campaign::factory()
            ->count($campaignCount)
            ->for($user)
            ->approved()
            ->create();

        return $user->fresh();
    }

    public static function assertJsonApiStructure(array $response): void
    {
        expect($response)->toHaveKeys(['data']);
    }

    public static function assertJsonApiCollectionStructure(array $response): void
    {
        expect($response)->toHaveKeys(['data']);
        expect($response['data'])->toBeArray();
    }

    public static function assertJsonApiResourceStructure(array $response): void
    {
        expect($response)->toHaveKeys(['data']);
        expect($response['data'])->toBeArray();
    }
}
