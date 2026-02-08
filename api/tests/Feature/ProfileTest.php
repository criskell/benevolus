<?php

use App\Models\User;

test('get profile requires authentication', function () {
    $response = $this->getJson('/api/profile');

    $response->assertStatus(401);
});

test('can get own profile', function () {
    $user = User::factory()->create(['name' => 'Jane Doe', 'email' => 'jane@example.com']);

    $response = $this->actingAs($user)->getJson('/api/profile');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                'id',
                'name',
            ],
        ])
        ->assertJsonPath('data.id', $user->id)
        ->assertJsonPath('data.name', 'Jane Doe');
});

test('can update profile name and email', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->putJson('/api/profile', [
        'name' => 'Updated Name',
        'email' => 'newemail@example.com',
    ]);

    $response->assertStatus(204);

    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => 'Updated Name',
        'email' => 'newemail@example.com',
    ]);
});

test('update profile requires authentication', function () {
    $response = $this->putJson('/api/profile', [
        'name' => 'Updated Name',
    ]);

    $response->assertStatus(401);
});

test('update profile validates email format', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->putJson('/api/profile', [
        'email' => 'invalid-email',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['email']);
});

test('update profile validates email uniqueness', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create(['email' => 'taken@example.com']);

    $response = $this->actingAs($user)->putJson('/api/profile', [
        'email' => 'taken@example.com',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['email']);
});

test('update profile allows same email for current user', function () {
    $user = User::factory()->create(['email' => 'same@example.com']);

    $response = $this->actingAs($user)->putJson('/api/profile', [
        'email' => 'same@example.com',
    ]);

    $response->assertStatus(204);
});
