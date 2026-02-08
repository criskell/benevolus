<?php

namespace App\Policies;

use App\Models\Campaign;
use App\Models\User;
use Illuminate\Auth\Access\Response;

final class CampaignPolicy
{
    public function update(User $user, Campaign $campaign): Response
    {
        return $user->id === $campaign->user_id
            ? Response::allow()
            : Response::deny();
    }

    public function delete(User $user, Campaign $campaign): Response
    {
        return $user->id === $campaign->user_id
            ? Response::allow()
            : Response::deny();
    }
}
