<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: "1.0.0",
    title: "Benevolus",
    description: "API Documentation"
)]
#[OA\Server(
    url: "http://localhost:8000",
    description: "Local Server",
)]
#[OA\SecurityScheme(
    securityScheme: "bearerAuth",
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
)]
#[OA\Tag(name: "Authentication", description: "OAuth authentication endpoints")]
#[OA\Tag(name: "Profile", description: "User profile management")]
#[OA\Tag(name: "Campaigns", description: "Campaign management endpoints")]
#[OA\Tag(name: "Donations", description: "Donation endpoints")]
#[OA\Tag(name: "Comments", description: "Comment management endpoints")]
#[OA\Tag(name: "Withdrawals", description: "Withdrawal management endpoints")]
#[OA\Tag(name: "Reports", description: "Report management endpoints")]
#[OA\Tag(name: "Leaderboard", description: "Leaderboard endpoints")]
#[OA\Components(
    schemas: [
        new OA\Schema(
            schema: "ValidationErrorResponse",
            properties: [
                new OA\Property(property: "message", type: "string", example: "The data provided is invalid"),
                new OA\Property(
                    property: "errors",
                    type: "object",
                    additionalProperties: new OA\AdditionalProperties(
                        type: "array",
                        items: new OA\Items(type: "string")
                    )
                ),
            ],
            type: "object"
        ),
        new OA\Schema(
            schema: "UnauthorizedResponse",
            properties: [
                new OA\Property(property: "message", type: "string", example: "Unauthenticated"),
            ],
            type: "object"
        ),
        new OA\Schema(
            schema: "NotFoundResponse",
            properties: [
                new OA\Property(property: "message", type: "string", example: "Resource not found"),
            ],
            type: "object"
        ),
        new OA\Schema(
            schema: "ForbiddenResponse",
            properties: [
                new OA\Property(property: "message", type: "string", example: "Forbidden"),
            ],
            type: "object"
        ),
    ],
    responses: [
        new OA\Response(
            response: "ValidationError",
            description: "Validation error",
            content: new OA\JsonContent(
                ref: "#/components/schemas/ValidationErrorResponse"
            )
        ),
        new OA\Response(
            response: "Unauthorized",
            description: "Unauthenticated",
            content: new OA\JsonContent(
                ref: "#/components/schemas/UnauthorizedResponse"
            )
        ),
        new OA\Response(
            response: "NotFound",
            description: "Resource not found",
            content: new OA\JsonContent(
                ref: "#/components/schemas/NotFoundResponse"
            )
        ),
        new OA\Response(
            response: "Forbidden",
            description: "Forbidden",
            content: new OA\JsonContent(
                ref: "#/components/schemas/ForbiddenResponse"
            )
        ),
        new OA\Response(
            response: "NoContent",
            description: "Success with no content"
        ),
    ]
)]
abstract class Controller
{
    //
}
