<?php

use App\Models\Campaign;
use App\Models\Transaction;
use App\Models\User;

test('list campaign transactions requires authentication', function () {
    $campaign = Campaign::factory()->open()->create();

    $response = $this->getJson("/api/campaigns/{$campaign->id}/transactions");

    $response->assertStatus(401);
});

test('can list campaign transactions when authenticated', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();
    Transaction::factory()->donation()->count(2)->for($campaign)->create();
    Transaction::factory()->withdrawal()->for($campaign)->create();

    $response = $this->actingAs($user)->getJson("/api/campaigns/{$campaign->id}/transactions");

    $response->assertStatus(200)
        ->assertJsonStructure([
            'summary' => [
                'balanceCents',
                'totalReceivedCents',
                'totalWithdrawnCents',
            ],
            'data' => [
                '*' => [
                    'id',
                    'campaignId',
                    'userId',
                    'type',
                    'amountCents',
                    'direction',
                    'createdAt',
                    'updatedAt',
                ],
            ],
            'meta' => [
                'currentPage',
                'lastPage',
                'perPage',
                'total',
            ],
        ]);

    expect($response->json('data'))->toHaveCount(3);
    expect($response->json('meta.total'))->toBe(3);
});

test('list campaign transactions returns correct summary', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();

    Transaction::factory()->for($campaign)->create([
        'type' => 'donation',
        'amount_cents' => 10000,
    ]);
    Transaction::factory()->for($campaign)->create([
        'type' => 'donation',
        'amount_cents' => 5000,
    ]);
    Transaction::factory()->for($campaign)->create([
        'type' => 'withdrawal',
        'amount_cents' => -3000,
    ]);

    $response = $this->actingAs($user)->getJson("/api/campaigns/{$campaign->id}/transactions");

    $response->assertStatus(200);
    expect($response->json('summary.balanceCents'))->toBe(12000);
    expect($response->json('summary.totalReceivedCents'))->toBe(15000);
    expect($response->json('summary.totalWithdrawnCents'))->toBe(3000);
});

test('can filter transactions by type', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();

    Transaction::factory()->donation()->count(3)->for($campaign)->create();
    Transaction::factory()->withdrawal()->count(2)->for($campaign)->create();

    $response = $this->actingAs($user)->getJson("/api/campaigns/{$campaign->id}/transactions?type=donation");

    $response->assertStatus(200);
    expect($response->json('data'))->toHaveCount(3);

    foreach ($response->json('data') as $transaction) {
        expect($transaction['type'])->toBe('donation');
    }
});

test('can filter transactions by period', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();

    Transaction::factory()->for($campaign)->create([
        'type' => 'donation',
        'amount_cents' => 5000,
        'created_at' => now()->subDays(3),
    ]);
    Transaction::factory()->for($campaign)->create([
        'type' => 'donation',
        'amount_cents' => 10000,
        'created_at' => now()->subDays(10),
    ]);

    $response = $this->actingAs($user)->getJson("/api/campaigns/{$campaign->id}/transactions?period=7");

    $response->assertStatus(200);
    expect($response->json('data'))->toHaveCount(1);
    expect($response->json('data.0.amountCents'))->toBe(5000);
});

test('list transactions returns only that campaign transactions', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();
    $otherCampaign = Campaign::factory()->open()->create();

    Transaction::factory()->donation()->for($campaign)->create();
    Transaction::factory()->donation()->for($otherCampaign)->create();

    $response = $this->actingAs($user)->getJson("/api/campaigns/{$campaign->id}/transactions");

    $response->assertStatus(200);
    expect($response->json('data'))->toHaveCount(1);
    expect($response->json('data.0.campaignId'))->toBe($campaign->id);
});

test('list transactions returns 404 for non-existent campaign', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->getJson('/api/campaigns/99999/transactions');

    $response->assertStatus(404);
});

test('transactions include user data when available', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();

    Transaction::factory()->for($campaign)->for($user)->donation()->create();

    $response = $this->actingAs($user)->getJson("/api/campaigns/{$campaign->id}/transactions");

    $response->assertStatus(200);
    expect($response->json('data.0.user.id'))->toBe($user->id);
    expect($response->json('data.0.user.name'))->toBe($user->name);
});
