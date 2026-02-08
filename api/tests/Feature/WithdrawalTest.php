<?php

use App\Models\Campaign;
use App\Models\User;
use App\Models\Withdrawal;
use OpenPix\PhpSdk\Client;
use OpenPix\PhpSdk\Resources\Payments;

test('list campaign withdrawals requires authentication', function () {
    $campaign = Campaign::factory()->open()->create();

    $response = $this->getJson("/api/campaigns/{$campaign->id}/withdrawals");

    $response->assertStatus(401);
});

test('can list campaign withdrawals when authenticated', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();
    Withdrawal::factory()->count(2)->for($campaign)->create();

    $response = $this->actingAs($user)->getJson("/api/campaigns/{$campaign->id}/withdrawals");

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'campaignId',
                    'amountCents',
                    'status',
                    'pixKey',
                    'pixKeyType',
                    'createdAt',
                ],
            ],
        ]);

    expect($response->json('data'))->toHaveCount(2);
});

test('list campaign withdrawals returns only that campaign withdrawals', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();
    $otherCampaign = Campaign::factory()->open()->create();

    Withdrawal::factory()->for($campaign)->create();
    Withdrawal::factory()->for($otherCampaign)->create();

    $response = $this->actingAs($user)->getJson("/api/campaigns/{$campaign->id}/withdrawals");

    $response->assertStatus(200);

    expect($response->json('data'))->toHaveCount(1);
    expect($response->json('data.0.campaignId'))->toBe($campaign->id);
});

test('list withdrawals returns 404 for non-existent campaign', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->getJson('/api/campaigns/99999/withdrawals');

    $response->assertStatus(404);
});

test('create withdrawal requires authentication', function () {
    $campaign = Campaign::factory()->open()->create();

    $response = $this->postJson("/api/campaigns/{$campaign->id}/withdrawals", [
        'amountCents' => 10000,
        'pixKey' => 'user@example.com',
        'pixKeyType' => 'email',
    ]);

    $response->assertStatus(401);
});

test('can create withdrawal as campaign owner when balance is sufficient', function () {
    $mockPayments = Mockery::mock(Payments::class);
    $mockPayments->shouldReceive('create')->once()->andReturn([]);
    $mockWoovi = Mockery::mock(Client::class);
    $mockWoovi->shouldReceive('payments')->andReturn($mockPayments);
    $this->app->instance(Client::class, $mockWoovi);

    $user = User::factory()->create();
    $campaign = Campaign::factory()->for($user)->open()->create();
    $campaign->update(['available_balance_cents' => 50000]);

    $response = $this->actingAs($user)->postJson("/api/campaigns/{$campaign->id}/withdrawals", [
        'amountCents' => 10000,
        'pixKey' => 'user@example.com',
        'pixKeyType' => 'email',
    ]);

    $response->assertStatus(204);

    $this->assertDatabaseHas('withdrawals', [
        'campaign_id' => $campaign->id,
        'amountCents' => 10000,
        'pix_key' => 'user@example.com',
        'pix_key_type' => 'email',
    ]);
});

test('cannot create withdrawal for another users campaign', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();
    $campaign->update(['available_balance_cents' => 50000]);

    $response = $this->actingAs($user)->postJson("/api/campaigns/{$campaign->id}/withdrawals", [
        'amountCents' => 10000,
        'pixKey' => 'user@example.com',
        'pixKeyType' => 'email',
    ]);

    $response->assertStatus(403);
});

test('cannot create withdrawal when amount exceeds available balance', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->for($user)->open()->create();
    $campaign->update(['available_balance_cents' => 5000]);

    $response = $this->actingAs($user)->postJson("/api/campaigns/{$campaign->id}/withdrawals", [
        'amountCents' => 10000,
        'pixKey' => 'user@example.com',
        'pixKeyType' => 'email',
    ]);

    $response->assertStatus(403);
});

test('create withdrawal validates required fields', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->for($user)->open()->create();
    $campaign->update(['available_balance_cents' => 50000]);

    $response = $this->actingAs($user)->postJson("/api/campaigns/{$campaign->id}/withdrawals", []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['amountCents', 'pixKey', 'pixKeyType']);
});

test('can show withdrawal', function () {
    $campaign = Campaign::factory()->open()->create();
    $withdrawal = Withdrawal::factory()->for($campaign)->create();

    $response = $this->getJson("/api/withdrawals/{$withdrawal->id}");

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                'id',
                'campaignId',
                'amountCents',
                'status',
                'pixKey',
                'pixKeyType',
                'createdAt',
            ],
        ])
        ->assertJsonPath('data.id', $withdrawal->id);
});

test('show withdrawal returns 404 for non-existent withdrawal', function () {
    $response = $this->getJson('/api/withdrawals/99999');

    $response->assertStatus(404);
});
