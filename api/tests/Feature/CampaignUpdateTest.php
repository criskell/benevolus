<?php

use App\Models\Campaign;
use App\Models\CampaignUpdate;
use App\Models\Donation;
use App\Models\User;

test('can list campaign updates without authentication', function () {
    $campaign = Campaign::factory()->open()->create();
    CampaignUpdate::factory()->count(2)->for($campaign)->create(['visible_to_donors_only' => false]);

    $response = $this->getJson("/api/campaigns/{$campaign->id}/updates");

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'campaignId',
                    'title',
                    'content',
                    'visibleToDonorsOnly',
                    'createdAt',
                    'updatedAt',
                ],
            ],
        ]);

    expect($response->json('data'))->toHaveCount(2);
});

test('list campaign updates excludes donors-only when user is not donor', function () {
    $campaign = Campaign::factory()->open()->create();
    CampaignUpdate::factory()->for($campaign)->create(['visible_to_donors_only' => false]);
    CampaignUpdate::factory()->for($campaign)->donorsOnly()->create();
    $user = User::factory()->create();

    $response = $this->actingAsUser($user)->getJson("/api/campaigns/{$campaign->id}/updates");

    $response->assertStatus(200);
    $data = $response->json('data');
    expect($data)->toHaveCount(1);
    expect($data[0]['visibleToDonorsOnly'])->toBeFalse();
});

test('list campaign updates includes donors-only when user is donor', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();
    Donation::factory()->for($user)->for($campaign)->paid()->create();
    CampaignUpdate::factory()->for($campaign)->create(['visible_to_donors_only' => false]);
    CampaignUpdate::factory()->for($campaign)->donorsOnly()->create();

    $response = $this->actingAsUser($user)->getJson("/api/campaigns/{$campaign->id}/updates");

    $response->assertStatus(200);
    expect($response->json('data'))->toHaveCount(2);
});

test('can show a public campaign update', function () {
    $campaign = Campaign::factory()->open()->create();
    $update = CampaignUpdate::factory()->for($campaign)->create(['visible_to_donors_only' => false]);

    $response = $this->getJson("/api/updates/{$update->id}");

    $response->assertStatus(200)
        ->assertJson([
            'data' => [
                'id' => $update->id,
                'campaignId' => $campaign->id,
                'title' => $update->title,
                'content' => $update->content,
                'visibleToDonorsOnly' => false,
            ],
        ]);
});

test('show returns 404 for donors-only update when user is not donor', function () {
    $campaign = Campaign::factory()->open()->create();
    $update = CampaignUpdate::factory()->for($campaign)->donorsOnly()->create();
    $user = User::factory()->create();

    $response = $this->actingAsUser($user)->getJson("/api/updates/{$update->id}");

    $response->assertStatus(404);
});

test('can show donors-only update when user is donor', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();
    Donation::factory()->for($user)->for($campaign)->paid()->create();
    $update = CampaignUpdate::factory()->for($campaign)->donorsOnly()->create();

    $response = $this->actingAsUser($user)->getJson("/api/updates/{$update->id}");

    $response->assertStatus(200)
        ->assertJsonPath('data.id', $update->id)
        ->assertJsonPath('data.visibleToDonorsOnly', true);
});

test('show returns 404 for non-existent update', function () {
    $response = $this->getJson('/api/updates/99999');

    $response->assertStatus(404);
});

test('create campaign update requires authentication', function () {
    $campaign = Campaign::factory()->open()->create();

    $response = $this->postJson("/api/campaigns/{$campaign->id}/updates", [
        'title' => 'Update title',
        'content' => 'Update content',
        'visibleToDonorsOnly' => false,
    ]);

    $response->assertStatus(401);
});

test('can create campaign update as campaign owner', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->for($user)->open()->create();

    $response = $this->actingAsUser($user)->postJson("/api/campaigns/{$campaign->id}/updates", [
        'title' => 'New update',
        'content' => 'Update content here',
        'visibleToDonorsOnly' => true,
    ]);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'data' => [
                'id',
                'campaignId',
                'title',
                'content',
                'visibleToDonorsOnly',
                'createdAt',
                'updatedAt',
            ],
        ])
        ->assertJsonPath('data.title', 'New update')
        ->assertJsonPath('data.content', 'Update content here')
        ->assertJsonPath('data.visibleToDonorsOnly', true)
        ->assertJsonPath('data.campaignId', $campaign->id);

    $this->assertDatabaseHas('campaign_updates', [
        'campaign_id' => $campaign->id,
        'title' => 'New update',
        'content' => 'Update content here',
        'visible_to_donors_only' => true,
    ]);
});

test('cannot create campaign update for another users campaign', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create(); // other owner

    $response = $this->actingAsUser($user)->postJson("/api/campaigns/{$campaign->id}/updates", [
        'title' => 'Hacked update',
        'content' => 'Content',
        'visibleToDonorsOnly' => false,
    ]);

    $response->assertStatus(403);
});

test('create campaign update validates required fields', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->for($user)->open()->create();

    $response = $this->actingAsUser($user)->postJson("/api/campaigns/{$campaign->id}/updates", []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['title', 'content', 'visibleToDonorsOnly']);
});

test('delete campaign update requires authentication', function () {
    $update = CampaignUpdate::factory()->create();

    $response = $this->deleteJson("/api/updates/{$update->id}");

    $response->assertStatus(401);
});

test('can delete own campaign update', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->for($user)->open()->create();
    $update = CampaignUpdate::factory()->for($campaign)->create();

    $response = $this->actingAsUser($user)->deleteJson("/api/updates/{$update->id}");

    $response->assertStatus(204);

    $this->assertDatabaseMissing('campaign_updates', [
        'id' => $update->id,
    ]);
});

test('cannot delete another users campaign update', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create(); // other owner
    $update = CampaignUpdate::factory()->for($campaign)->create();

    $response = $this->actingAsUser($user)->deleteJson("/api/updates/{$update->id}");

    $response->assertStatus(403);

    $this->assertDatabaseHas('campaign_updates', [
        'id' => $update->id,
    ]);
});

test('delete returns 404 for non-existent update', function () {
    $user = User::factory()->create();

    $response = $this->actingAsUser($user)->deleteJson('/api/updates/99999');

    $response->assertStatus(404);
});
