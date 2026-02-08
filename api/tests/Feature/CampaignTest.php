<?php

use App\Models\Campaign;
use App\Models\User;

test('can list campaigns', function () {
    $user = User::factory()->create();
    Campaign::factory()->count(5)->open()->create();

    $response = $this->actingAs($user)->getJson('/api/campaigns');

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
});

test('can create a campaign', function () {
    $user = User::factory()->create();

    $campaignData = [
        'title' => 'Test Campaign',
        'description' => 'This is a test campaign description',
        'goalCents' => 100000,
        'expiresAt' => now()->addDays(30)->toIso8601String(),
    ];

    $response = $this->actingAs($user)->postJson('/api/campaigns', $campaignData);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'data' => [
                'id',
                'title',
                'description',
                'goalCents',
                'status',
            ],
        ]);

    expect($response->json('data.title'))->toBe('Test Campaign');

    $this->assertDatabaseHas('campaigns', [
        'user_id' => $user->id,
        'title' => 'Test Campaign',
        'status' => Campaign::STATUS_IN_REVIEW,
    ]);
});

test('can view a specific campaign', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();

    $response = $this->actingAs($user)->getJson("/api/campaigns/{$campaign->id}");

    $response->assertStatus(200)
        ->assertJson([
            'data' => [
                'id' => $campaign->id,
                'title' => $campaign->title,
            ],
        ]);
});

test('can update own campaign', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->for($user)->open()->create();

    $updateData = [
        'title' => 'Updated Title',
        'description' => 'Updated description',
        'goalCents' => $campaign->goal_cents,
        'status' => Campaign::STATUS_OPEN,
    ];

    $response = $this->actingAs($user)->putJson("/api/campaigns/{$campaign->id}", $updateData);

    $response->assertStatus(204);

    $this->assertDatabaseHas('campaigns', [
        'id' => $campaign->id,
        'title' => 'Updated Title',
    ]);
});

test('cannot update another users campaign', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $campaign = Campaign::factory()->for($otherUser)->create();

    $updateData = [
        'title' => 'Hacked Title',
        'description' => $campaign->description,
        'goalCents' => $campaign->goal_cents,
        'status' => Campaign::STATUS_OPEN,
    ];

    $response = $this->actingAs($user)->putJson("/api/campaigns/{$campaign->id}", $updateData);

    $response->assertStatus(403);
});

test('can delete own campaign', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->for($user)->create();

    $response = $this->actingAs($user)->deleteJson("/api/campaigns/{$campaign->id}");

    $response->assertStatus(204);

    $this->assertDatabaseMissing('campaigns', [
        'id' => $campaign->id,
    ]);
});

test('campaign creation requires authentication', function () {
    $campaignData = [
        'title' => 'Test Campaign',
        'description' => 'This is a test campaign description',
        'goalCents' => 100000,
    ];

    $response = $this->postJson('/api/campaigns', $campaignData);

    $response->assertStatus(401);
});

test('campaign validation fails with invalid data', function () {
    $user = User::factory()->create();

    $invalidData = [
        'title' => '',
        'goal_cents' => -100,
    ];

    $response = $this->actingAs($user)->postJson('/api/campaigns', $invalidData);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['title', 'description', 'goalCents']);
});
