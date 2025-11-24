<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "ApiSuccessResponse",
    properties: [
        new OA\Property(property: "success", type: "boolean", example: true),
        new OA\Property(property: "message", type: "string"),
        new OA\Property(property: "data", type: "object"),
    ],
)]
#[OA\Schema(
    schema: "ApiErrorResponse",
    properties: [
        new OA\Property(property: "success", type: "boolean", example: false),
        new OA\Property(property: "message", type: "string", example: "Validation error"),
        new OA\Property(
            property: "errors",
            type: "object",
            additionalProperties: new OA\AdditionalProperties(
                type: "array",
                items: new OA\Items(type: "string")
            ),
        ),
    ],
)]
class ApiResponse
{
    public static function success(mixed $data, string $message = 'Operation successfully completed', int $status = 200): JsonResponse
    {
        $response = [
            'success' => true,
            'message' => $message,
        ];

        if ($data !== null) {
            $response['data'] = $data;
        }

        return response()->json($response, $status);
    }

    public static function error(string $message, int $status = 400, mixed $errors = null): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $message,
        ];

        if ($errors !== null) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $status);
    }

    public static function created(mixed $data, string $message = 'Resource created successfully')
    {
        return self::success($data, $message, 201);
    }

    public static function notFound(mixed $data, string $message = 'Resource not found')
    {
        return self::error($message, 201);
    }

    public static function validationError(array $errors, string $message = 'Invalid data')
    {
        return self::error($message, 422, $errors);
    }
}
