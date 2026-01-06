<?php

use App\Models\Campaign;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('can list campaigns', function () {
    Campaign::factory()->count(5)->approved()->create();

    $response = $this->jsonAs($this->user, 'GET', '/api/campaigns');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'description',
                    'goal_cents',
                    'status',
                ],
            ],
        ]);
});

test('can create a campaign', function () {
    $campaignData = [
        'title' => 'Test Campaign',
        'description' => 'This is a test campaign description',
        'goal_cents' => 100000,
        'expires_at' => now()->addDays(30)->toIso8601String(),
    ];

    $response = $this->jsonAs($this->user, 'POST', '/api/campaigns', $campaignData);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'data' => [
                'id',
                'title',
                'description',
                'goal_cents',
            ],
        ]);

    $this->assertDatabaseHas('campaigns', [
        'user_id' => $this->user->id,
        'title' => 'Test Campaign',
        'status' => Campaign::STATUS_PENDING,
    ]);
});

test('can view a specific campaign', function () {
    $campaign = Campaign::factory()->approved()->create();

    $response = $this->jsonAs($this->user, 'GET', "/api/campaigns/{$campaign->id}");

    $response->assertStatus(200)
        ->assertJson([
            'data' => [
                'id' => $campaign->id,
                'title' => $campaign->title,
            ],
        ]);
});

test('can update own campaign', function () {
    $campaign = Campaign::factory()->for($this->user)->create();

    $updateData = [
        'title' => 'Updated Title',
        'description' => 'Updated description',
    ];

    $response = $this->jsonAs($this->user, 'PUT', "/api/campaigns/{$campaign->id}", $updateData);

    $response->assertStatus(200);

    $this->assertDatabaseHas('campaigns', [
        'id' => $campaign->id,
        'title' => 'Updated Title',
    ]);
});

test('cannot update another users campaign', function () {
    $otherUser = User::factory()->create();
    $campaign = Campaign::factory()->for($otherUser)->create();

    $updateData = [
        'title' => 'Hacked Title',
    ];

    $response = $this->jsonAs($this->user, 'PUT', "/api/campaigns/{$campaign->id}", $updateData);

    $response->assertStatus(403);
});

test('can delete own campaign', function () {
    $campaign = Campaign::factory()->for($this->user)->create();

    $response = $this->jsonAs($this->user, 'DELETE', "/api/campaigns/{$campaign->id}");

    $response->assertStatus(204);

    $this->assertDatabaseMissing('campaigns', [
        'id' => $campaign->id,
    ]);
});

test('campaign creation requires authentication', function () {
    $campaignData = [
        'title' => 'Test Campaign',
        'description' => 'This is a test campaign description',
        'goal_cents' => 100000,
    ];

    $response = $this->json('POST', '/api/campaigns', $campaignData);

    $response->assertStatus(401);
});

test('campaign validation fails with invalid data', function () {
    $invalidData = [
        'title' => '',
        'goal_cents' => -100,
    ];

    $response = $this->jsonAs($this->user, 'POST', '/api/campaigns', $invalidData);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['title', 'goal_cents']);
});
