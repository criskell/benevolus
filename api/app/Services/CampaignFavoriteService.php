<?php

namespace App\Services;

use App\Models\Campaign;
use App\Models\User;

final class CampaignFavoriteService
{
    public function toggleFavorite(User $user, Campaign $campaign)
    {
        if ($user->favoriteCampaigns()->where('campaign_id', $campaign->id)->exists()) {
            $user->favoriteCampaigns()->detach($campaign);
            return false;
        }

        $user->favoriteCampaigns()->attach($campaign);
        return true;
    }

    public function listFavorites(User $user)
    {
        return $user->favoriteCampaigns()->get();
    }
}
