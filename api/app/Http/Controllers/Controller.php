<?php

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
#[OA\Tag(name: "Donations", description: "Donations endpoints")]
#[OA\Tag(name: "Campaigns", description: "Campaigns donations")]
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
    ],
    responses: [
        new OA\Response(
            response: "ValidationError",
            description: "Validation error",
            content: new OA\JsonContent(
                ref: "#/components/schemas/ValidationErrorResponse"
            )
        ),
    ]
)]
abstract class Controller
{
    //
}
