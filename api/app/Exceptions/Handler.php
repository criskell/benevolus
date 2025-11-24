<?php

namespace App\Exceptions;

use App\Http\Responses\ApiResponse;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (PaymentException $e, $request) {
            if ($request->expectsJson()) {
                app(LoggerInterface::class)->error(
                    'Payment exception',
                    [
                        'message' => $e->getMessage(),
                        'context' => $e->getContext(),
                        'trace' => $e->getTraceAsString(),
                    ]
                );

                return ApiResponse::error(
                    message: $e->getMessage(),
                    status: $e->getCode() ?: 422,
                    errors: $e->getContext()
                );
            }
        });

        $this->renderable(function (DonationException $e, $request) {
            if ($request->expectsJson()) {
                app(LoggerInterface::class)->warning(
                    'Donation exception',
                    [
                        'message' => $e->getMessage(),
                        'context' => $e->getContext(),
                    ]
                );

                return ApiResponse::error(
                    message: $e->getMessage(),
                    status: $e->getCode() ?: 422,
                    errors: $e->getContext()
                );
            }
        });

        $this->renderable(function (ValidationException $e, $request) {
            if ($request->expectsJson()) {
                return ApiResponse::validationError(
                    errors: $e->errors(),
                    message: 'The data provided is invalid',
                );
            }
        });

        $this->renderable(function (NotFoundHttpException $e, $request) {
            if ($request->expectsJson()) {
                return ApiResponse::notFound('Resource not found');
            }
        });
    }
}
