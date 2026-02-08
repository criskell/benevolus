<?php

use App\Models\Campaign;
use App\Models\Donation;
use App\Models\User;

test('can get top campaigns without authentication', function () {
    Campaign::factory()->count(3)->open()->create();

    $response = $this->getJson('/api/leaderboard/campaigns');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                ],
            ],
        ]);
});

test('can get top campaigns with limit parameter', function () {
    $response = $this->getJson('/api/leaderboard/campaigns?limit=5');

    $response->assertStatus(200);
    expect($response->json('data'))->toHaveCount(0);
});

test('top campaigns returns campaigns ordered by donated amount', function () {
    $campaign1 = Campaign::factory()->open()->create(['title' => 'Campaign A']);
    $campaign2 = Campaign::factory()->open()->create(['title' => 'Campaign B']);
    $user = User::factory()->create();
    Donation::factory()->for($user)->for($campaign1)->paid()->create(['amount_cents' => 10000]);
    Donation::factory()->for($user)->for($campaign2)->paid()->create(['amount_cents' => 50000]);

    $response = $this->getJson('/api/leaderboard/campaigns?limit=10');

    $response->assertStatus(200);
    $data = $response->json('data');
    expect($data)->toHaveCount(2);
    expect($data[0]['totalDonated'])->toBe(50000);
    expect($data[1]['totalDonated'])->toBe(10000);
});

test('can get top donors without authentication', function () {
    $response = $this->getJson('/api/leaderboard/donors');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'name',
                ],
            ],
        ]);
});

test('top donors returns users ordered by total donated', function () {
    $user1 = User::factory()->create(['name' => 'Donor A']);
    $user2 = User::factory()->create(['name' => 'Donor B']);
    $campaign = Campaign::factory()->open()->create();
    Donation::factory()->for($user1)->for($campaign)->paid()->create(['amount_cents' => 5000]);
    Donation::factory()->for($user2)->for($campaign)->paid()->create(['amount_cents' => 20000]);

    $response = $this->getJson('/api/leaderboard/donors?limit=10');

    $response->assertStatus(200);
    $data = $response->json('data');
    $donorTotals = collect($data)->pluck('totalDonated')->filter(fn ($v) => $v > 0)->sortByDesc(fn ($v) => $v)->values()->all();
    expect($donorTotals)->toBe([20000, 5000]);
});

test('can get top creators without authentication', function () {
    $response = $this->getJson('/api/leaderboard/creators');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'name',
                    'totalCampaigns',
                ],
            ],
        ]);
});

test('top creators returns users ordered by campaign count', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    Campaign::factory()->count(2)->for($user1)->open()->create();
    Campaign::factory()->count(5)->for($user2)->open()->create();

    $response = $this->getJson('/api/leaderboard/creators?limit=10');

    $response->assertStatus(200);
    $data = $response->json('data');
    expect($data)->toHaveCount(2);
    expect($data[0]['totalCampaigns'])->toBe(5);
    expect($data[1]['totalCampaigns'])->toBe(2);
});
