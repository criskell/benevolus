<?php

namespace App\Exceptions;

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

                return response()->json([
                    'message' => $e->getMessage(),
                    'errors' => $e->getContext(),
                ], $e->getCode() ?: 422);
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

                return response()->json([
                    'message' => $e->getMessage(),
                    'errors' => $e->getContext(),
                ], $e->getCode() ?: 422);
            }
        });

        $this->renderable(function (ValidationException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'The data provided is invalid',
                    'errors' => $e->errors(),
                ], 422);
            }
        });

        $this->renderable(function (NotFoundHttpException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Resource not found',
                ], 404);
            }
        });
    }
}
