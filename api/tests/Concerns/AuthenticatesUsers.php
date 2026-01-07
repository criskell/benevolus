<?php

namespace Tests\Concerns;

use App\Models\User;
use Illuminate\Testing\TestResponse;
use Laravel\Sanctum\Sanctum;

trait AuthenticatesUsers
{
    protected function actingAsUser(?User $user = null, array $abilities = ['*']): User
    {
        $user = $user ?? User::factory()->create();

        Sanctum::actingAs($user, $abilities);

        return $user;
    }

    protected function actingAsAdmin(): User
    {
        return $this->actingAsUser(User::factory()->admin()->create());
    }

    protected function jsonAs(User $user, string $method, string $uri, array $data = [], array $headers = []): TestResponse
    {
        Sanctum::actingAs($user);

        return $this->json($method, $uri, $data, $headers);
    }
}
