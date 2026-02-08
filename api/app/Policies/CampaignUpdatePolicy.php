<?php

namespace App\Policies;

use App\Models\CampaignUpdate;
use App\Models\User;
use Illuminate\Auth\Access\Response;

final class CampaignUpdatePolicy
{
    public function delete(User $user, CampaignUpdate $campaignUpdate): Response
    {
        return $user->id === $campaignUpdate->campaign->user_id
            ? Response::allow()
            : Response::deny();
    }
}
