<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
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

    public function index(Request $request)
    {
        return new UserResource($request->user());
    }
}
