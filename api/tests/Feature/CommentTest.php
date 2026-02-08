<?php

use App\Models\Campaign;
use App\Models\Comment;
use App\Models\User;

test('can list campaign comments without authentication', function () {
    $campaign = Campaign::factory()->open()->create();
    Comment::factory()->count(2)->for($campaign)->create();

    $response = $this->getJson("/api/campaigns/{$campaign->id}/comments");

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'campaignId',
                    'content',
                    'isAnonymous',
                    'likes',
                    'createdAt',
                ],
            ],
        ]);

    expect($response->json('data'))->toHaveCount(2);
});

test('list comments returns 404 for non-existent campaign', function () {
    $response = $this->getJson('/api/campaigns/99999/comments');

    $response->assertStatus(404);
});

test('create comment requires authentication', function () {
    $campaign = Campaign::factory()->open()->create();

    $response = $this->postJson("/api/campaigns/{$campaign->id}/comments", [
        'content' => 'My comment',
        'is_anonymous' => false,
    ]);

    $response->assertStatus(401);
});

test('can create comment', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();

    $response = $this->actingAs($user)->postJson("/api/campaigns/{$campaign->id}/comments", [
        'content' => 'My comment content',
        'is_anonymous' => false,
    ]);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'data' => [
                'id',
                'campaignId',
                'content',
                'isAnonymous',
                'likes',
                'createdAt',
            ],
        ])
        ->assertJsonPath('data.content', 'My comment content')
        ->assertJsonPath('data.isAnonymous', false)
        ->assertJsonPath('data.campaignId', $campaign->id);

    $this->assertDatabaseHas('comments', [
        'campaign_id' => $campaign->id,
        'user_id' => $user->id,
        'content' => 'My comment content',
        'is_anonymous' => false,
    ]);
});

test('can create anonymous comment', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();

    $response = $this->actingAs($user)->postJson("/api/campaigns/{$campaign->id}/comments", [
        'content' => 'Anonymous comment',
        'is_anonymous' => true,
    ]);

    $response->assertStatus(201)
        ->assertJsonPath('data.isAnonymous', true);

    $this->assertDatabaseHas('comments', [
        'campaign_id' => $campaign->id,
        'user_id' => $user->id,
        'content' => 'Anonymous comment',
        'is_anonymous' => true,
    ]);
});

test('create comment validates required fields', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();

    $response = $this->actingAs($user)->postJson("/api/campaigns/{$campaign->id}/comments", []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['content', 'is_anonymous']);
});

test('create comment returns 404 for non-existent campaign', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson('/api/campaigns/99999/comments', [
        'content' => 'Comment',
        'is_anonymous' => false,
    ]);

    $response->assertStatus(404);
});

test('update comment requires authentication', function () {
    $comment = Comment::factory()->create();

    $response = $this->putJson("/api/comments/{$comment->id}", [
        'content' => 'Updated content',
    ]);

    $response->assertStatus(401);
});

test('can update own comment', function () {
    $user = User::factory()->create();
    $comment = Comment::factory()->for($user)->create(['content' => 'Original']);

    $response = $this->actingAs($user)->putJson("/api/comments/{$comment->id}", [
        'content' => 'Updated content',
    ]);

    $response->assertStatus(200)
        ->assertJsonPath('data.content', 'Updated content');

    $this->assertDatabaseHas('comments', [
        'id' => $comment->id,
        'content' => 'Updated content',
    ]);
});

test('cannot update another users comment', function () {
    $user = User::factory()->create();
    $comment = Comment::factory()->create(['content' => 'Original']);

    $response = $this->actingAs($user)->putJson("/api/comments/{$comment->id}", [
        'content' => 'Hacked content',
    ]);

    $response->assertStatus(403);

    $this->assertDatabaseHas('comments', [
        'id' => $comment->id,
        'content' => 'Original',
    ]);
});

test('update comment returns 404 for non-existent comment', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->putJson('/api/comments/99999', [
        'content' => 'Updated',
    ]);

    $response->assertStatus(404);
});

test('delete comment requires authentication', function () {
    $comment = Comment::factory()->create();

    $response = $this->deleteJson("/api/comments/{$comment->id}");

    $response->assertStatus(401);
});

test('can delete own comment', function () {
    $user = User::factory()->create();
    $comment = Comment::factory()->for($user)->create();

    $response = $this->actingAs($user)->deleteJson("/api/comments/{$comment->id}");

    $response->assertStatus(204);

    $this->assertDatabaseMissing('comments', [
        'id' => $comment->id,
    ]);
});

test('cannot delete another users comment', function () {
    $user = User::factory()->create();
    $comment = Comment::factory()->create();

    $response = $this->actingAs($user)->deleteJson("/api/comments/{$comment->id}");

    $response->assertStatus(403);

    $this->assertDatabaseHas('comments', [
        'id' => $comment->id,
    ]);
});

test('delete comment returns 404 for non-existent comment', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->deleteJson('/api/comments/99999');

    $response->assertStatus(404);
});
