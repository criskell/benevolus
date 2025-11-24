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
abstract class Controller
{
    //
}
