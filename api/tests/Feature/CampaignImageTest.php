<?php

use App\Models\Campaign;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('s3');
});

test('upload campaign image requires authentication', function () {
    $campaign = Campaign::factory()->open()->create();

    $response = $this->post("/api/campaigns/{$campaign->id}/images", [
        'image' => UploadedFile::fake()->image('photo.jpg'),
    ], ['Accept' => 'application/json']);

    $response->assertStatus(401);
});

test('upload campaign image requires campaign ownership', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create(); // owned by another user

    $response = $this->actingAsUser($user)->post("/api/campaigns/{$campaign->id}/images", [
        'image' => UploadedFile::fake()->image('photo.jpg'),
    ], ['Accept' => 'application/json']);

    $response->assertStatus(403);
});

test('can upload campaign image as campaign owner', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->for($user)->open()->create();

    $response = $this->actingAsUser($user)->post("/api/campaigns/{$campaign->id}/images", [
        'image' => UploadedFile::fake()->image('photo.jpg'),
    ], ['Accept' => 'application/json']);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'data' => [
                'id',
                'path',
                'url',
                'createdAt',
            ],
        ]);

    $this->assertDatabaseHas('campaign_media_assets', [
        'campaign_id' => $campaign->id,
        'type' => 'image',
    ]);
});

test('upload campaign image returns 404 for non-existent campaign', function () {
    $user = User::factory()->create();

    $response = $this->actingAsUser($user)->post('/api/campaigns/99999/images', [
        'image' => UploadedFile::fake()->image('photo.jpg'),
    ], ['Accept' => 'application/json']);

    $response->assertStatus(404);
});

test('upload campaign image validates required image', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->for($user)->open()->create();

    $response = $this->actingAsUser($user)->post("/api/campaigns/{$campaign->id}/images", [], [
        'Accept' => 'application/json',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['image']);
});

test('upload campaign image validates image mime type', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->for($user)->open()->create();

    $response = $this->actingAsUser($user)->post("/api/campaigns/{$campaign->id}/images", [
        'image' => UploadedFile::fake()->create('document.pdf', 100),
    ], ['Accept' => 'application/json']);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['image']);
});
