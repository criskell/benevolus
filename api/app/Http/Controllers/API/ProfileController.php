<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Services\User\ProfileService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;

class ProfileController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            'auth:sanctum'
        ];
    }

    public function __construct(private ProfileService $profileService) {}

    public function show(Request $request)
    {
        return new UserResource($request->user()->load('address'));
    }

    public function update(UpdateProfileRequest $request)
    {
        $this->profileService->updateProfile($request->user(), $request->validated());

        return response()->noContent();
    }
}
