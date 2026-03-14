<?php
declare(strict_types=1);

namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Post(
    operationId: "register",
    path: "/auth/register",
    summary: "Register a new user",
    tags: ["Authentication"],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ["name", "email", "password", "password_confirmation"],
            properties: [
                new OA\Property(property: "name", type: "string"),
                new OA\Property(property: "email", type: "string", format: "email"),
                new OA\Property(property: "password", type: "string", format: "password", minLength: 8),
                new OA\Property(property: "password_confirmation", type: "string", format: "password"),
            ]
        )
    ),
    responses: [
        new OA\Response(
            response: 201,
            description: "User registered successfully",
            content: new OA\JsonContent(ref: "#/components/schemas/UserResource")
        ),
        new OA\Response(
            response: 422,
            description: "Validation error",
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "message", type: "string"),
                    new OA\Property(property: "errors", type: "object"),
                ]
            )
        ),
    ]
)]
#[OA\Post(
    operationId: "login",
    path: "/auth/login",
    summary: "Authenticate a user",
    tags: ["Authentication"],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ["email", "password"],
            properties: [
                new OA\Property(property: "email", type: "string", format: "email"),
                new OA\Property(property: "password", type: "string", format: "password"),
            ]
        )
    ),
    responses: [
        new OA\Response(
            response: 200,
            description: "Authenticated successfully",
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "two_factor", type: "boolean"),
                ]
            )
        ),
        new OA\Response(
            response: 422,
            description: "Invalid credentials",
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "message", type: "string"),
                    new OA\Property(property: "errors", type: "object"),
                ]
            )
        ),
    ]
)]
#[OA\Post(
    operationId: "logout",
    path: "/auth/logout",
    summary: "Log out the authenticated user",
    tags: ["Authentication"],
    security: [["bearerAuth" => []]],
    responses: [
        new OA\Response(
            response: 204,
            description: "Logged out successfully"
        ),
        new OA\Response(
            response: 401,
            description: "Unauthenticated"
        ),
    ]
)]
#[OA\Post(
    operationId: "forgotPassword",
    path: "/auth/forgot-password",
    summary: "Send a password reset link",
    tags: ["Authentication"],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ["email"],
            properties: [
                new OA\Property(property: "email", type: "string", format: "email"),
            ]
        )
    ),
    responses: [
        new OA\Response(
            response: 200,
            description: "Reset link sent",
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "status", type: "string"),
                ]
            )
        ),
        new OA\Response(
            response: 422,
            description: "Validation error",
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "message", type: "string"),
                    new OA\Property(property: "errors", type: "object"),
                ]
            )
        ),
    ]
)]
#[OA\Post(
    operationId: "resetPassword",
    path: "/auth/reset-password",
    summary: "Reset the user password",
    tags: ["Authentication"],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ["token", "email", "password", "password_confirmation"],
            properties: [
                new OA\Property(property: "token", type: "string"),
                new OA\Property(property: "email", type: "string", format: "email"),
                new OA\Property(property: "password", type: "string", format: "password", minLength: 8),
                new OA\Property(property: "password_confirmation", type: "string", format: "password"),
            ]
        )
    ),
    responses: [
        new OA\Response(
            response: 200,
            description: "Password reset successfully",
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "status", type: "string"),
                ]
            )
        ),
        new OA\Response(
            response: 422,
            description: "Validation error",
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "message", type: "string"),
                    new OA\Property(property: "errors", type: "object"),
                ]
            )
        ),
    ]
)]
final class AuthSchema
{
}
