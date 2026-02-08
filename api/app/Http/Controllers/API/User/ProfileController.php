<?php
declare(strict_types=1);

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Http\Resources\User\UserResource;
use App\Services\User\ProfileService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use OpenApi\Attributes as OA;

final class ProfileController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            'auth:sanctum'
        ];
    }

    public function __construct(private ProfileService $profileService) {}

    #[OA\Get(
        operationId: "getProfile",
        path: "/api/profile",
        summary: "Get current user profile",
        tags: ["Profile"],
        responses: [
            new OA\Response(
                response: 200,
                description: "Profile retrieved successfully",
                content: new OA\JsonContent(
                    ref: "#/components/schemas/UserResource"
                )
            ),
        ]
    )]
    public function show(Request $request)
    {
        return new UserResource($request->user()->load('address'));
    }

    #[OA\Put(
        operationId: "updateProfile",
        path: "/api/profile",
        summary: "Update user profile",
        tags: ["Profile"],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                ref: "#/components/schemas/UpdateProfileRequest"
            )
        ),
        responses: [
            new OA\Response(response: 204, description: "Profile updated successfully"),
        ]
    )]
    public function update(UpdateProfileRequest $request)
    {
        $this->profileService->updateProfile($request->user(), $request->validated());

        return response()->noContent();
    }
}
