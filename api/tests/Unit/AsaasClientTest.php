<?php

use App\Services\Payment\Asaas\AsaasClient;

/**
 * Integration tests against the real Asaas sandbox API.
 * Run with: php artisan test --filter=AsaasClient --group=asaas-integration
 */
$client = null;

beforeEach(function () {
    $apiKey = env('ASAAS_API_KEY');

    if (empty($apiKey)) {
        $this->markTestSkipped('ASAAS_API_KEY not set — skipping Asaas integration tests.');
    }

    $this->client = new AsaasClient(
        apiKey: $apiKey,
        baseUrl: env('ASAAS_BASE_URL', 'https://sandbox.asaas.com/api/v3'),
    );
});

test('can create a customer in Asaas sandbox', function () {
    $customer = $this->client->createCustomer([
        'name' => 'Teste Benevolus',
        'cpfCnpj' => '94271564656',
        'email' => 'teste@benevolus.com',
        'notificationDisabled' => true,
    ]);

    expect($customer)
        ->toHaveKey('id')
        ->toHaveKey('name', 'Teste Benevolus')
        ->toHaveKey('cpfCnpj', '94271564656');
})->group('asaas-integration');

test('can find a customer by CPF', function () {
    $this->client->createCustomer([
        'name' => 'Busca CPF Teste',
        'cpfCnpj' => '94271564656',
        'email' => 'busca@benevolus.com',
        'notificationDisabled' => true,
    ]);

    $customer = $this->client->findCustomerByCpfCnpj('94271564656');

    expect($customer)->not->toBeNull()
        ->and($customer['cpfCnpj'])->toBe('94271564656');
})->group('asaas-integration');

test('can create a PIX payment in Asaas sandbox', function () {
    $customer = $this->client->createCustomer([
        'name' => 'Pix Teste',
        'cpfCnpj' => '94271564656',
        'notificationDisabled' => true,
    ]);

    $payment = $this->client->createPayment([
        'customer' => $customer['id'],
        'billingType' => 'PIX',
        'value' => 10.00,
        'dueDate' => now()->format('Y-m-d'),
        'description' => 'Test PIX donation',
        'externalReference' => 'test-pix-'.uniqid(),
    ]);

    expect($payment)
        ->toHaveKey('id')
        ->toHaveKey('status', 'PENDING')
        ->toHaveKey('billingType', 'PIX')
        ->toHaveKey('value', 10.0);
})->group('asaas-integration');

test('can get PIX QR code after creating payment', function () {
    $customer = $this->client->createCustomer([
        'name' => 'QR Code Teste',
        'cpfCnpj' => '94271564656',
        'notificationDisabled' => true,
    ]);

    $payment = $this->client->createPayment([
        'customer' => $customer['id'],
        'billingType' => 'PIX',
        'value' => 10.00,
        'dueDate' => now()->format('Y-m-d'),
        'externalReference' => 'test-qr-'.uniqid(),
    ]);

    // Asaas sandbox may take a moment to generate the PIX QR code
    sleep(1);

    $qrCode = $this->client->getPixQrCode($payment['id']);

    expect($qrCode)
        ->toHaveKey('encodedImage')
        ->toHaveKey('payload')
        ->and($qrCode['payload'])->toBeString()->not->toBeEmpty()
        ->and($qrCode['encodedImage'])->toBeString()->not->toBeEmpty();
})->group('asaas-integration');

test('can create a credit card payment in Asaas sandbox', function () {
    $customer = $this->client->createCustomer([
        'name' => 'Cartao Teste',
        'cpfCnpj' => '94271564656',
        'email' => 'cartao@benevolus.com',
        'notificationDisabled' => true,
    ]);

    $payment = $this->client->createPayment([
        'customer' => $customer['id'],
        'billingType' => 'CREDIT_CARD',
        'value' => 10.00,
        'dueDate' => now()->format('Y-m-d'),
        'description' => 'Test credit card donation',
        'externalReference' => 'test-cc-'.uniqid(),
        'creditCard' => [
            'holderName' => 'Cartao Teste',
            'number' => '5162306219378829',
            'expiryMonth' => '01',
            'expiryYear' => '2030',
            'ccv' => '318',
        ],
        'creditCardHolderInfo' => [
            'name' => 'Cartao Teste',
            'email' => 'cartao@benevolus.com',
            'cpfCnpj' => '94271564656',
            'postalCode' => '01001000',
            'addressNumber' => '100',
            'phone' => '11999999999',
        ],
    ]);

    expect($payment)
        ->toHaveKey('id')
        ->toHaveKey('status')
        ->toHaveKey('billingType', 'CREDIT_CARD')
        ->and($payment['status'])->toBeIn(['CONFIRMED', 'PENDING', 'AWAITING_RISK_ANALYSIS']);
})->group('asaas-integration');

test('can create a boleto payment in Asaas sandbox', function () {
    $customer = $this->client->createCustomer([
        'name' => 'Boleto Teste',
        'cpfCnpj' => '94271564656',
        'notificationDisabled' => true,
    ]);

    $payment = $this->client->createPayment([
        'customer' => $customer['id'],
        'billingType' => 'BOLETO',
        'value' => 25.00,
        'dueDate' => now()->addDays(3)->format('Y-m-d'),
        'description' => 'Test boleto donation',
        'externalReference' => 'test-boleto-'.uniqid(),
    ]);

    expect($payment)
        ->toHaveKey('id')
        ->toHaveKey('status')
        ->toHaveKey('billingType', 'BOLETO')
        ->toHaveKey('bankSlipUrl');
})->group('asaas-integration');

test('can retrieve a payment by id', function () {
    $customer = $this->client->createCustomer([
        'name' => 'Retrieve Teste',
        'cpfCnpj' => '94271564656',
        'notificationDisabled' => true,
    ]);

    $created = $this->client->createPayment([
        'customer' => $customer['id'],
        'billingType' => 'PIX',
        'value' => 7.50,
        'dueDate' => now()->format('Y-m-d'),
        'externalReference' => 'test-retrieve-'.uniqid(),
    ]);

    $payment = $this->client->getPayment($created['id']);

    expect($payment)
        ->toHaveKey('id', $created['id'])
        ->toHaveKey('value', 7.5)
        ->toHaveKey('status');
})->group('asaas-integration');

test('can find a payment by external reference', function () {
    $customer = $this->client->createCustomer([
        'name' => 'ExtRef Teste',
        'cpfCnpj' => '94271564656',
        'notificationDisabled' => true,
    ]);

    $externalRef = 'test-extref-'.uniqid();

    $this->client->createPayment([
        'customer' => $customer['id'],
        'billingType' => 'PIX',
        'value' => 10.00,
        'dueDate' => now()->format('Y-m-d'),
        'externalReference' => $externalRef,
    ]);

    $payment = $this->client->findPaymentByExternalReference($externalRef);

    expect($payment)->not->toBeNull()
        ->and($payment['externalReference'])->toBe($externalRef);
})->group('asaas-integration');

test('findPaymentByExternalReference returns null for unknown reference', function () {
    $payment = $this->client->findPaymentByExternalReference('nonexistent-ref-'.uniqid());

    expect($payment)->toBeNull();
})->group('asaas-integration');
