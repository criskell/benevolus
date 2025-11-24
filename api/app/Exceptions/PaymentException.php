<?php

namespace App\Exceptions;

use Exception;
use Throwable;

class PaymentException extends Exception
{
    private array $context;

    public function __construct(string $message, array $context = [], int $code = 422, ?Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
        $this->context = $context;
    }

    public function getContext(): array
    {
        return $this->context;
    }

    public static function processingFailed(string $message, array $context = []): self
    {
        return new self(
            message: "Payment failed to process: {$message}",
            context: $context,
            code: 422,
        );
    }

    public static function invalidPaymentMethod(string $method): self
    {
        return new self(
            message: "Invalid payment method: {$method}",
            context: ['payment_method' => $method],
            code: 422
        );
    }

    public static function notFound(string $paymentId): self
    {
        return new self(
            message: 'Payment not found',
            context: ['paymentId' => $paymentId],
            code: 404
        );
    }
}
