<?php

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
