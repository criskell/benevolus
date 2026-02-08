<?php

namespace Tests\Concerns;

use App\Models\User;

trait AuthenticatesUsers
{
    public function actingAsUser(User $user): self
    {
        return $this->actingAs($user);
    }
}
