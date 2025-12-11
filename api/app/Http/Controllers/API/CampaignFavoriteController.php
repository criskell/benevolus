<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CampaignResource;
use App\Http\Responses\ApiResponse;
use App\Models\Campaign;
use App\Services\CampaignFavoriteService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;

class CampaignFavoriteController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return ['auth:sanctum'];
    }

    public function __construct(private CampaignFavoriteService $campaignFavoriteService) {}

    public function index(Request $request)
    {
        $favoritedCampaigns = $this->campaignFavoriteService->listFavorites($request->user());

        return CampaignResource::collection($favoritedCampaigns);
    }

    public function toggle(Request $request, Campaign $campaign)
    {
        $favorited = $this->campaignFavoriteService->toggleFavorite($request->user(), $campaign);

        return ApiResponse::success([
            'favorited' => $favorited,
        ]);
    }
}
