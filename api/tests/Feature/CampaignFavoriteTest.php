<?php

use App\Models\Campaign;
use App\Models\User;

test('list favorited campaigns requires authentication', function () {
    $response = $this->getJson('/api/profile/campaigns/favorited');

    $response->assertStatus(401);
});

test('can list empty favorited campaigns', function () {
    $user = User::factory()->create();

    $response = $this->actingAsUser($user)->getJson('/api/profile/campaigns/favorited');

    $response->assertStatus(200)
        ->assertJsonPath('data', []);
});

test('can list favorited campaigns', function () {
    $user = User::factory()->create();
    $campaigns = Campaign::factory()->count(3)->open()->create();
    $user->favoriteCampaigns()->attach($campaigns);

    $response = $this->actingAsUser($user)->getJson('/api/profile/campaigns/favorited');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'description',
                    'goalCents',
                    'status',
                ],
            ],
        ]);

    expect($response->json('data'))->toHaveCount(3);
});

test('list favorited campaigns only returns current user favorites', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $userCampaign = Campaign::factory()->open()->create();
    $otherUserCampaign = Campaign::factory()->open()->create();
    $user->favoriteCampaigns()->attach($userCampaign);
    $otherUser->favoriteCampaigns()->attach($otherUserCampaign);

    $response = $this->actingAsUser($user)->getJson('/api/profile/campaigns/favorited');

    $response->assertStatus(200);
    $ids = collect($response->json('data'))->pluck('id')->all();
    expect($ids)->toContain($userCampaign->id);
    expect($ids)->not->toContain($otherUserCampaign->id);
});

test('toggle favorite requires authentication', function () {
    $campaign = Campaign::factory()->open()->create();

    $response = $this->postJson("/api/campaigns/{$campaign->id}/favorite");

    $response->assertStatus(401);
});

test('toggle favorite returns 404 for non-existent campaign', function () {
    $user = User::factory()->create();

    $response = $this->actingAsUser($user)->postJson('/api/campaigns/99999/favorite');

    $response->assertStatus(404);
});

test('can add campaign to favorites', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();

    $response = $this->actingAsUser($user)->postJson("/api/campaigns/{$campaign->id}/favorite");

    $response->assertStatus(200)
        ->assertJson(['favorited' => true]);

    $this->assertDatabaseHas('campaign_user_favorites', [
        'user_id' => $user->id,
        'campaign_id' => $campaign->id,
    ]);
});

test('can remove campaign from favorites', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();
    $user->favoriteCampaigns()->attach($campaign);

    $response = $this->actingAsUser($user)->postJson("/api/campaigns/{$campaign->id}/favorite");

    $response->assertStatus(200)
        ->assertJson(['favorited' => false]);

    $this->assertDatabaseMissing('campaign_user_favorites', [
        'user_id' => $user->id,
        'campaign_id' => $campaign->id,
    ]);
});

test('toggle favorite is idempotent', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();

    $first = $this->actingAsUser($user)->postJson("/api/campaigns/{$campaign->id}/favorite");
    $first->assertJson(['favorited' => true]);

    $second = $this->actingAsUser($user)->postJson("/api/campaigns/{$campaign->id}/favorite");
    $second->assertJson(['favorited' => false]);

    $third = $this->actingAsUser($user)->postJson("/api/campaigns/{$campaign->id}/favorite");
    $third->assertJson(['favorited' => true]);
});

test('toggle favorite does not affect other users favorites', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();
    $otherUser->favoriteCampaigns()->attach($campaign);

    $this->actingAsUser($user)->postJson("/api/campaigns/{$campaign->id}/favorite");

    $this->assertDatabaseHas('campaign_user_favorites', [
        'user_id' => $otherUser->id,
        'campaign_id' => $campaign->id,
    ]);
    $this->assertDatabaseHas('campaign_user_favorites', [
        'user_id' => $user->id,
        'campaign_id' => $campaign->id,
    ]);
});
