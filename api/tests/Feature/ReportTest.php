<?php

use App\Models\Campaign;
use App\Models\Report;
use App\Models\User;

test('list reports requires authentication', function () {
    $response = $this->getJson('/api/reports');

    $response->assertStatus(401);
});

test('can list reports when authenticated', function () {
    $user = User::factory()->create();
    Report::factory()->count(2)->create();

    $response = $this->actingAs($user)->getJson('/api/reports');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'reason',
                    'description',
                    'createdAt',
                ],
            ],
        ]);

    expect($response->json('data'))->toHaveCount(2);
});

test('create report requires authentication', function () {
    $campaign = Campaign::factory()->open()->create();

    $response = $this->postJson("/api/campaigns/{$campaign->id}/reports", [
        'type' => 'personal_rights',
        'reason' => 'SPAM',
        'description' => 'Campaign violates personal rights with false claims.',
    ]);

    $response->assertStatus(401);
});

test('can create report', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();

    $response = $this->actingAs($user)->postJson("/api/campaigns/{$campaign->id}/reports", [
        'type' => 'terms_violations',
        'reason' => 'FRAUD',
        'description' => 'This campaign appears to violate the terms of service.',
    ]);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'data' => [
                'id',
                'reason',
                'description',
                'createdAt',
            ],
        ])
        ->assertJsonPath('data.reason', 'FRAUD')
        ->assertJsonPath('data.description', 'This campaign appears to violate the terms of service.');

    $this->assertDatabaseHas('reports', [
        'user_id' => $user->id,
        'campaign_id' => $campaign->id,
        'type' => 'terms_violations',
        'reason' => 'FRAUD',
        'description' => 'This campaign appears to violate the terms of service.',
        'status' => 'pending',
    ]);
});

test('create report validates reason must be uppercase', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();

    $response = $this->actingAs($user)->postJson("/api/campaigns/{$campaign->id}/reports", [
        'type' => 'personal_rights',
        'reason' => 'lowercase reason',
        'description' => 'At least ten characters here for the description.',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['reason']);
});

test('create report validates required fields', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();

    $response = $this->actingAs($user)->postJson("/api/campaigns/{$campaign->id}/reports", []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['type', 'reason', 'description']);
});

test('create report validates type enum', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();

    $response = $this->actingAs($user)->postJson("/api/campaigns/{$campaign->id}/reports", [
        'type' => 'invalid_type',
        'reason' => 'OTHER',
        'description' => 'At least ten characters here for the description.',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['type']);
});

test('create report validates description min length', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();

    $response = $this->actingAs($user)->postJson("/api/campaigns/{$campaign->id}/reports", [
        'type' => 'personal_rights',
        'reason' => 'SPAM',
        'description' => 'short',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['description']);
});

test('create report returns 404 for non-existent campaign', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson('/api/campaigns/99999/reports', [
        'type' => 'personal_rights',
        'reason' => 'SPAM',
        'description' => 'At least ten characters here for the description.',
    ]);

    $response->assertStatus(404);
});
