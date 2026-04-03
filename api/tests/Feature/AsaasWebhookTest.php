<?php

use App\Events\DonationPaid;
use App\Models\Campaign;
use App\Models\Donation;
use App\Models\User;
use App\Notifications\DonationReceived;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;

function webhookPayload(string $event, string $externalReference, string $billingType = 'CREDIT_CARD'): array
{
    return [
        'id' => 'evt_' . uniqid(),
        'event' => $event,
        'dateCreated' => '2026-04-03 13:52:12',
        'account' => [
            'id' => 'ce7cff6d-1b2e-4cc2-9fd6-7aa513b664db',
            'ownerId' => null,
        ],
        'payment' => [
            'object' => 'payment',
            'id' => 'pay_' . uniqid(),
            'dateCreated' => '2026-04-03',
            'customer' => 'cus_000007749177',
            'value' => 10,
            'netValue' => 9.32,
            'originalValue' => null,
            'interestValue' => null,
            'description' => 'Test donation',
            'billingType' => $billingType,
            'confirmedDate' => '2026-04-03',
            'status' => 'CONFIRMED',
            'dueDate' => '2026-04-03',
            'originalDueDate' => '2026-04-03',
            'paymentDate' => null,
            'clientPaymentDate' => '2026-04-03',
            'externalReference' => $externalReference,
            'deleted' => false,
            'anticipated' => false,
            'anticipable' => false,
            'creditDate' => '2026-05-05',
            'estimatedCreditDate' => '2026-05-05',
            'transactionReceiptUrl' => 'https://sandbox.asaas.com/comprovantes/123',
            'invoiceUrl' => 'https://sandbox.asaas.com/i/123',
            'invoiceNumber' => '13859775',
            'bankSlipUrl' => null,
            'nossoNumero' => null,
            'pixTransaction' => null,
            'creditCard' => [
                'creditCardNumber' => '8829',
                'creditCardBrand' => 'MASTERCARD',
                'creditCardToken' => 'eb2515bb-40b4-4675-bd1e-c04a7f8fcdea',
            ],
            'refunds' => null,
        ],
    ];
}

beforeEach(function () {
    config(['services.asaas.webhook_token' => 'test-webhook-token']);
});

test('webhook rejects request without auth token', function () {
    $response = $this->postJson('/api/asaas/webhook', webhookPayload('PAYMENT_CONFIRMED', 'ref-123'));

    $response->assertStatus(401)
        ->assertJsonPath('errors.0.message', 'Invalid webhook token.');
});

test('webhook rejects request with invalid auth token', function () {
    $response = $this->postJson('/api/asaas/webhook', webhookPayload('PAYMENT_CONFIRMED', 'ref-123'), [
        'asaas-access-token' => 'wrong-token',
    ]);

    $response->assertStatus(401);
});

test('webhook confirms payment and updates donation to paid', function () {
    Event::fake([DonationPaid::class]);
    Notification::fake();

    $owner = User::factory()->create();
    $campaign = Campaign::factory()->for($owner)->open()->create([
        'available_balance_cents' => 0,
    ]);
    $donation = Donation::factory()->for($campaign)->create([
        'external_reference' => 'test-cc-69cff03949958',
        'payment_status' => 'pending',
        'amount_cents' => 1000,
        'paid_at' => null,
    ]);

    $response = $this->postJson('/api/asaas/webhook',
        webhookPayload('PAYMENT_CONFIRMED', 'test-cc-69cff03949958'),
        ['asaas-access-token' => 'test-webhook-token'],
    );

    $response->assertStatus(200)
        ->assertJsonPath('message', 'Success.');

    $donation->refresh();
    expect($donation->payment_status)->toBe('paid')
        ->and($donation->paid_at)->not->toBeNull();

    $campaign->refresh();
    expect($campaign->available_balance_cents)->toBe(1000);

    Event::assertDispatched(DonationPaid::class, function ($event) {
        return $event->externalReference === 'test-cc-69cff03949958';
    });

    Notification::assertSentTo($owner, DonationReceived::class);
});

test('webhook handles PAYMENT_RECEIVED event the same as PAYMENT_CONFIRMED', function () {
    Event::fake([DonationPaid::class]);
    Notification::fake();

    $owner = User::factory()->create();
    $campaign = Campaign::factory()->for($owner)->open()->create([
        'available_balance_cents' => 5000,
    ]);
    $donation = Donation::factory()->for($campaign)->create([
        'external_reference' => 'test-pix-received',
        'payment_status' => 'pending',
        'amount_cents' => 2000,
        'paid_at' => null,
    ]);

    $response = $this->postJson('/api/asaas/webhook',
        webhookPayload('PAYMENT_RECEIVED', 'test-pix-received', 'PIX'),
        ['asaas-access-token' => 'test-webhook-token'],
    );

    $response->assertStatus(200);

    $donation->refresh();
    expect($donation->payment_status)->toBe('paid');

    $campaign->refresh();
    expect($campaign->available_balance_cents)->toBe(7000);
});

test('webhook is idempotent — does not double-process already paid donation', function () {
    Event::fake([DonationPaid::class]);
    Notification::fake();

    $owner = User::factory()->create();
    $campaign = Campaign::factory()->for($owner)->open()->create([
        'available_balance_cents' => 1000,
    ]);
    Donation::factory()->for($campaign)->create([
        'external_reference' => 'test-already-paid',
        'payment_status' => 'paid',
        'amount_cents' => 1000,
        'paid_at' => now(),
    ]);

    $response = $this->postJson('/api/asaas/webhook',
        webhookPayload('PAYMENT_CONFIRMED', 'test-already-paid'),
        ['asaas-access-token' => 'test-webhook-token'],
    );

    $response->assertStatus(200)
        ->assertJsonPath('message', 'Already processed.');

    $campaign->refresh();
    expect($campaign->available_balance_cents)->toBe(1000);

    Event::assertNotDispatched(DonationPaid::class);
    Notification::assertNothingSent();
});

test('webhook returns 404 for unknown external reference', function () {
    $response = $this->postJson('/api/asaas/webhook',
        webhookPayload('PAYMENT_CONFIRMED', 'nonexistent-ref'),
        ['asaas-access-token' => 'test-webhook-token'],
    );

    $response->assertStatus(404)
        ->assertJsonPath('errors.0.message', 'Donation not found.');
});

test('webhook acknowledges unhandled events', function () {
    $payload = webhookPayload('PAYMENT_UPDATED', 'some-ref');
    $payload['event'] = 'PAYMENT_UPDATED';

    $response = $this->postJson('/api/asaas/webhook', $payload, [
        'asaas-access-token' => 'test-webhook-token',
    ]);

    $response->assertStatus(200)
        ->assertJsonPath('message', 'Event acknowledged.');
});
