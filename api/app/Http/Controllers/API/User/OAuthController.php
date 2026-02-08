<?php
declare(strict_types=1);

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Services\User\OAuthService;
use OpenApi\Attributes as OA;

final class OAuthController extends Controller
{
    public function __construct(private OAuthService $oAuthService) {}

    #[OA\Get(
        operationId: "oauthRedirect",
        path: "/api/auth/{provider}/redirect",
        summary: "Redirect to OAuth provider",
        tags: ["Authentication"],
        parameters: [
            new OA\Parameter(
                name: "provider",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "string", example: "google"),
                description: "OAuth provider name"
            ),
        ],
        responses: [
            new OA\Response(
                response: 302,
                description: "Redirect to OAuth provider"
            ),
        ]
    )]
    public function redirect(string $provider)
    {
        $url = $this->oAuthService->getRedirectUrl($provider);

        return redirect($url);
    }

    #[OA\Get(
        operationId: "oauthCallback",
        path: "/api/auth/{provider}/callback",
        summary: "OAuth callback",
        tags: ["Authentication"],
        parameters: [
            new OA\Parameter(
                name: "provider",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "string", example: "google"),
                description: "OAuth provider name"
            ),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "OAuth callback processed successfully",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "token", type: "string", example: "1|abc123..."),
                        new OA\Property(property: "user", ref: "#/components/schemas/UserResource"),
                    ],
                    type: "object"
                )
            ),
        ]
    )]
    public function callback(string $provider)
    {
        return response()->json($this->oAuthService->handleCallback($provider));
    }
}
