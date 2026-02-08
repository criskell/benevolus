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
abstract class Controller
{
    //
}
