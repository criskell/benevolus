<?php

namespace App\Exceptions;

use Exception;
use Throwable;

class DonationException extends Exception
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

    public static function notFound(int $donationId): self
    {
        return new self(
            message: 'Donatio not found',
            context: ['donation_id' => $donationId],
            code: 404
        );
    }

    public static function cannotCancel(int $donationId): self
    {
        return new self(
            message: 'It is not possible to cancel a paid donation.',
            context: ['donation_id' => $donationId],
            code: 422
        );
    }

    public static function processingFailed(string $reason): self
    {
        return new self(
            message: 'Error processing donation',
            context: ['reason' => $reason],
            code: 422
        );
    }
}
