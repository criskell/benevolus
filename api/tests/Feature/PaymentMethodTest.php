<?php

use App\Models\PaymentMethod;
use App\Models\User;

test('list payment methods requires authentication', function () {
    $this->getJson('/api/payment-methods')->assertStatus(401);
});

test('can list own payment methods', function () {
    $user = User::factory()->create();
    PaymentMethod::factory()->for($user)->create(['gateway_token' => 'tok_1']);
    PaymentMethod::factory()->for($user)->create(['gateway_token' => 'tok_2']);

    $response = $this->actingAs($user)->getJson('/api/payment-methods');

    $response->assertStatus(200)
        ->assertJsonCount(2)
        ->assertJsonStructure([
            '*' => ['id', 'brand', 'lastFour', 'expMonth', 'expYear', 'holderName', 'billingAddress', 'isDefault', 'createdAt'],
        ]);
});

test('does not list other users payment methods', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    PaymentMethod::factory()->for($otherUser)->create();

    $response = $this->actingAs($user)->getJson('/api/payment-methods');

    $response->assertStatus(200)->assertJsonCount(0);
});

test('does not expose gateway token in response', function () {
    $user = User::factory()->create();
    PaymentMethod::factory()->for($user)->create();

    $response = $this->actingAs($user)->getJson('/api/payment-methods');

    $response->assertStatus(200);
    $data = $response->json('0');
    expect($data)->not->toHaveKey('gatewayToken');
    expect($data)->not->toHaveKey('gateway_token');
});

test('store payment method requires authentication', function () {
    $this->postJson('/api/payment-methods', [])->assertStatus(401);
});

test('can store a tokenized payment method', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson('/api/payment-methods', [
        'token' => 'tok_test_123456',
        'brand' => 'visa',
        'lastFour' => '4242',
        'expMonth' => '12',
        'expYear' => '2028',
        'holderName' => 'John Doe',
        'billingPostalCode' => '12345678',
        'billingAddressNumber' => '100',
    ]);

    $response->assertStatus(201)
        ->assertJsonPath('data.brand', 'visa')
        ->assertJsonPath('data.lastFour', '4242')
        ->assertJsonPath('data.holderName', 'John Doe')
        ->assertJsonPath('data.isDefault', true);

    $this->assertDatabaseHas('payment_methods', [
        'user_id' => $user->id,
        'gateway_token' => 'tok_test_123456',
        'brand' => 'visa',
        'last_four' => '4242',
    ]);
});

test('first card is set as default automatically', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->postJson('/api/payment-methods', [
        'token' => 'tok_first',
        'brand' => 'visa',
        'lastFour' => '1111',
        'expMonth' => '06',
        'expYear' => '2029',
        'holderName' => 'Jane Doe',
    ]);

    $this->actingAs($user)->postJson('/api/payment-methods', [
        'token' => 'tok_second',
        'brand' => 'mastercard',
        'lastFour' => '2222',
        'expMonth' => '07',
        'expYear' => '2029',
        'holderName' => 'Jane Doe',
    ]);

    expect(PaymentMethod::where('user_id', $user->id)->where('is_default', true)->count())->toBe(1);
    expect(PaymentMethod::where('gateway_token', 'tok_first')->first()->is_default)->toBeTrue();
    expect(PaymentMethod::where('gateway_token', 'tok_second')->first()->is_default)->toBeFalse();
});

test('store payment method validates required fields', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson('/api/payment-methods', []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['token', 'brand', 'lastFour', 'expMonth', 'expYear', 'holderName']);
});

test('store payment method validates lastFour size', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson('/api/payment-methods', [
        'token' => 'tok_test',
        'brand' => 'visa',
        'lastFour' => '123',
        'expMonth' => '12',
        'expYear' => '2028',
        'holderName' => 'Test',
    ]);

    $response->assertStatus(422)->assertJsonValidationErrors(['lastFour']);
});

test('delete payment method requires authentication', function () {
    $pm = PaymentMethod::factory()->create();

    $this->deleteJson("/api/payment-methods/{$pm->id}")->assertStatus(401);
});

test('can delete own payment method', function () {
    $user = User::factory()->create();
    $pm = PaymentMethod::factory()->for($user)->create();

    $response = $this->actingAs($user)->deleteJson("/api/payment-methods/{$pm->id}");

    $response->assertStatus(204);
    $this->assertSoftDeleted('payment_methods', ['id' => $pm->id]);
});

test('cannot delete other users payment method', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $pm = PaymentMethod::factory()->for($otherUser)->create();

    $response = $this->actingAs($user)->deleteJson("/api/payment-methods/{$pm->id}");

    $response->assertStatus(403);
});

test('deleting default card promotes next card', function () {
    $user = User::factory()->create();
    $default = PaymentMethod::factory()->for($user)->default()->create();
    $other = PaymentMethod::factory()->for($user)->create();

    $this->actingAs($user)->deleteJson("/api/payment-methods/{$default->id}");

    expect($other->fresh()->is_default)->toBeTrue();
});

test('set default payment method requires authentication', function () {
    $pm = PaymentMethod::factory()->create();

    $this->postJson("/api/payment-methods/{$pm->id}/default")->assertStatus(401);
});

test('can set default payment method', function () {
    $user = User::factory()->create();
    $first = PaymentMethod::factory()->for($user)->default()->create();
    $second = PaymentMethod::factory()->for($user)->create();

    $response = $this->actingAs($user)->postJson("/api/payment-methods/{$second->id}/default");

    $response->assertStatus(204);
    expect($first->fresh()->is_default)->toBeFalse();
    expect($second->fresh()->is_default)->toBeTrue();
});

test('cannot set default on other users payment method', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $pm = PaymentMethod::factory()->for($otherUser)->create();

    $response = $this->actingAs($user)->postJson("/api/payment-methods/{$pm->id}/default");

    $response->assertStatus(403);
});

test('only one default card per user', function () {
    $user = User::factory()->create();
    $first = PaymentMethod::factory()->for($user)->default()->create();
    $second = PaymentMethod::factory()->for($user)->create();
    $third = PaymentMethod::factory()->for($user)->create();

    $this->actingAs($user)->postJson("/api/payment-methods/{$third->id}/default");

    expect(PaymentMethod::where('user_id', $user->id)->where('is_default', true)->count())->toBe(1);
    expect($third->fresh()->is_default)->toBeTrue();
});
