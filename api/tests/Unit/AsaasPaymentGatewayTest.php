<?php

use App\DTO\Donation\DonationDTO;
use App\DTO\Payment\CreditCardDTO;
use App\Services\Payment\Asaas\AsaasClient;
use App\Services\Payment\Asaas\AsaasPaymentGateway;

beforeEach(function () {
    $this->mockClient = Mockery::mock(AsaasClient::class);
    $this->gateway = new AsaasPaymentGateway($this->mockClient);
});

function makeDonationDTO(string $paymentMethod = 'pix', ?CreditCardDTO $creditCard = null): DonationDTO
{
    return new DonationDTO(
        amount: 5000,
        anonymousDonation: false,
        donor: new \App\DTO\User\DonorDTO(
            name: 'João Silva',
            email: 'joao@test.com',
            taxId: '123.456.789-00',
            phoneNumber: '11999999999',
        ),
        paymentMethod: $paymentMethod,
        campaignId: 1,
        creditCard: $creditCard,
    );
}

test('createPayment with PIX finds or creates customer and returns QR code', function () {
    $this->mockClient->shouldReceive('findCustomerByCpfCnpj')
        ->with('12345678900')
        ->once()
        ->andReturn(['id' => 'cus_123']);

    $this->mockClient->shouldReceive('createPayment')
        ->once()
        ->withArgs(function ($data) {
            return $data['customer'] === 'cus_123'
                && $data['billingType'] === 'PIX'
                && $data['value'] == 50
                && ! empty($data['externalReference']);
        })
        ->andReturn([
            'id' => 'pay_123',
            'status' => 'PENDING',
            'bankSlipUrl' => null,
        ]);

    $this->mockClient->shouldReceive('getPixQrCode')
        ->with('pay_123')
        ->once()
        ->andReturn([
            'payload' => 'pix-copy-paste-code',
            'encodedImage' => 'base64-qr-image',
        ]);

    $result = $this->gateway->createPayment(makeDonationDTO('pix'));

    expect($result)
        ->toHaveKey('externalReference')
        ->toHaveKey('status', 'pending')
        ->toHaveKey('pixCode', 'pix-copy-paste-code')
        ->toHaveKey('qrCode', 'base64-qr-image')
        ->toHaveKey('expiresAt')
        ->and($result['externalReference'])->toBeString()->toHaveLength(48);
});

test('createPayment with boleto returns bankSlipUrl', function () {
    $this->mockClient->shouldReceive('findCustomerByCpfCnpj')
        ->once()
        ->andReturn(null);

    $this->mockClient->shouldReceive('createCustomer')
        ->once()
        ->andReturn(['id' => 'cus_456']);

    $this->mockClient->shouldReceive('createPayment')
        ->once()
        ->withArgs(fn ($data) => $data['billingType'] === 'BOLETO')
        ->andReturn([
            'id' => 'pay_456',
            'status' => 'PENDING',
            'bankSlipUrl' => 'https://sandbox.asaas.com/b/pdf/pay_456',
        ]);

    $result = $this->gateway->createPayment(makeDonationDTO('boleto'));

    expect($result)
        ->toHaveKey('status', 'pending')
        ->toHaveKey('bankSlipUrl', 'https://sandbox.asaas.com/b/pdf/pay_456')
        ->toHaveKey('pixCode', null)
        ->toHaveKey('qrCode', null);
});

test('createPayment with credit card sends card data', function () {
    $creditCard = new CreditCardDTO(
        holderName: 'João Silva',
        number: '4111111111111111',
        expiryMonth: '12',
        expiryYear: '2030',
        ccv: '123',
        holderEmail: 'joao@test.com',
        holderCpfCnpj: '12345678900',
        holderPostalCode: '01001000',
        holderAddressNumber: '100',
        holderPhone: '11999999999',
    );

    $this->mockClient->shouldReceive('findCustomerByCpfCnpj')
        ->once()
        ->andReturn(['id' => 'cus_789']);

    $this->mockClient->shouldReceive('createPayment')
        ->once()
        ->withArgs(function ($data) {
            return $data['billingType'] === 'CREDIT_CARD'
                && isset($data['creditCard']['number'])
                && $data['creditCard']['number'] === '4111111111111111'
                && isset($data['creditCardHolderInfo']['cpfCnpj'])
                && $data['creditCardHolderInfo']['cpfCnpj'] === '12345678900';
        })
        ->andReturn([
            'id' => 'pay_789',
            'status' => 'CONFIRMED',
            'bankSlipUrl' => null,
        ]);

    $result = $this->gateway->createPayment(makeDonationDTO('credit_card', $creditCard));

    expect($result)
        ->toHaveKey('status', 'paid')
        ->toHaveKey('pixCode', null)
        ->toHaveKey('qrCode', null);
});

test('createPayment creates new customer when not found by CPF', function () {
    $this->mockClient->shouldReceive('findCustomerByCpfCnpj')
        ->with('12345678900')
        ->once()
        ->andReturn(null);

    $this->mockClient->shouldReceive('createCustomer')
        ->once()
        ->withArgs(function ($data) {
            return $data['name'] === 'João Silva'
                && $data['cpfCnpj'] === '12345678900'
                && $data['email'] === 'joao@test.com'
                && $data['notificationDisabled'] === true;
        })
        ->andReturn(['id' => 'cus_new']);

    $this->mockClient->shouldReceive('createPayment')
        ->once()
        ->withArgs(fn ($data) => $data['customer'] === 'cus_new')
        ->andReturn(['id' => 'pay_new', 'status' => 'PENDING', 'bankSlipUrl' => null]);

    $this->mockClient->shouldReceive('getPixQrCode')
        ->andReturn(['payload' => 'code', 'encodedImage' => 'img']);

    $this->gateway->createPayment(makeDonationDTO('pix'));
});

test('getPaymentStatus maps Asaas statuses correctly', function () {
    $statuses = [
        'RECEIVED' => 'paid',
        'CONFIRMED' => 'paid',
        'RECEIVED_IN_CASH' => 'paid',
        'PENDING' => 'pending',
        'AWAITING_RISK_ANALYSIS' => 'pending',
        'REFUNDED' => 'refunded',
        'REFUND_REQUESTED' => 'refunded',
        'OVERDUE' => 'failed',
    ];

    foreach ($statuses as $asaasStatus => $expectedStatus) {
        $this->mockClient->shouldReceive('findPaymentByExternalReference')
            ->with("ref-{$asaasStatus}")
            ->once()
            ->andReturn(['status' => $asaasStatus]);

        $result = $this->gateway->getPaymentStatus("ref-{$asaasStatus}");

        expect($result)->toBe($expectedStatus, "Expected {$asaasStatus} to map to {$expectedStatus}");
    }
});

test('getPaymentStatus returns pending when payment not found', function () {
    $this->mockClient->shouldReceive('findPaymentByExternalReference')
        ->with('unknown-ref')
        ->once()
        ->andReturn(null);

    $result = $this->gateway->getPaymentStatus('unknown-ref');

    expect($result)->toBe('pending');
});
