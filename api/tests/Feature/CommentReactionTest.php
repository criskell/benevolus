<?php

use App\Models\Campaign;
use App\Models\Comment;
use App\Models\CommentReaction;
use App\Models\User;

test('toggle comment reaction requires authentication', function () {
    $comment = Comment::factory()->create();

    $response = $this->postJson("/api/comments/{$comment->id}/react");

    $response->assertStatus(401);
});

test('can add reaction to comment', function () {
    $user = User::factory()->create();
    $comment = Comment::factory()->create();

    $response = $this->actingAs($user)->postJson("/api/comments/{$comment->id}/react");

    $response->assertStatus(204);

    $this->assertDatabaseHas('comment_reactions', [
        'comment_id' => $comment->id,
        'user_id' => $user->id,
        'liked' => true,
    ]);
});

test('can remove reaction from comment', function () {
    $user = User::factory()->create();
    $comment = Comment::factory()->create();
    CommentReaction::create([
        'comment_id' => $comment->id,
        'user_id' => $user->id,
        'liked' => true,
    ]);

    $response = $this->actingAs($user)->postJson("/api/comments/{$comment->id}/react");

    $response->assertStatus(204);

    $this->assertDatabaseMissing('comment_reactions', [
        'comment_id' => $comment->id,
        'user_id' => $user->id,
    ]);
});

test('toggle reaction is idempotent', function () {
    $user = User::factory()->create();
    $comment = Comment::factory()->create();

    $this->actingAs($user)->postJson("/api/comments/{$comment->id}/react");
    $this->assertDatabaseHas('comment_reactions', [
        'comment_id' => $comment->id,
        'user_id' => $user->id,
    ]);

    $this->actingAs($user)->postJson("/api/comments/{$comment->id}/react");
    $this->assertDatabaseMissing('comment_reactions', [
        'comment_id' => $comment->id,
        'user_id' => $user->id,
    ]);

    $this->actingAs($user)->postJson("/api/comments/{$comment->id}/react");
    $this->assertDatabaseHas('comment_reactions', [
        'comment_id' => $comment->id,
        'user_id' => $user->id,
    ]);
});

test('toggle reaction returns 404 for non-existent comment', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson('/api/comments/99999/react');

    $response->assertStatus(404);
});

test('comment list includes userHasReacted as true when user has reacted', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();
    $comment = Comment::factory()->create(['campaign_id' => $campaign->id]);
    CommentReaction::create([
        'comment_id' => $comment->id,
        'user_id' => $user->id,
        'liked' => true,
    ]);

    $response = $this->actingAs($user)->getJson("/api/campaigns/{$campaign->id}/comments");

    $response->assertStatus(200);
    $response->assertJsonPath('data.0.userHasReacted', true);
    $response->assertJsonPath('data.0.likes', 1);
});

test('comment list includes userHasReacted as false when user has not reacted', function () {
    $user = User::factory()->create();
    $campaign = Campaign::factory()->open()->create();
    Comment::factory()->create(['campaign_id' => $campaign->id]);

    $response = $this->actingAs($user)->getJson("/api/campaigns/{$campaign->id}/comments");

    $response->assertStatus(200);
    $response->assertJsonPath('data.0.userHasReacted', false);
    $response->assertJsonPath('data.0.likes', 0);
});

test('comment list includes userHasReacted as false for unauthenticated user', function () {
    $campaign = Campaign::factory()->open()->create();
    $comment = Comment::factory()->create(['campaign_id' => $campaign->id]);
    CommentReaction::create([
        'comment_id' => $comment->id,
        'user_id' => User::factory()->create()->id,
        'liked' => true,
    ]);

    $response = $this->getJson("/api/campaigns/{$campaign->id}/comments");

    $response->assertStatus(200);
    $response->assertJsonPath('data.0.userHasReacted', false);
    $response->assertJsonPath('data.0.likes', 1);
});
