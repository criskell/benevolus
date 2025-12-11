<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\LeaderboardRankingResource;
use App\Services\LeaderboardService;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    public function __construct(private LeaderboardService $leaderboardService) {}

    public function topCampaigns(Request $request)
    {
        $limit = $request->get('limit', 15);
        $campaigns = $this->leaderboardService->getTopCampaigns($limit);

        return LeaderboardRankingResource::collection($campaigns);
    }

    public function topDonors(Request $request)
    {
        $limit = $request->get('limit', 15);
        $donors = $this->leaderboardService->getTopDonors($limit);

        return LeaderboardRankingResource::collection($donors);
    }

    public function topCreators(Request $request)
    {
        $limit = $request->get('limit', 15);
        $creators = $this->leaderboardService->getTopCreators($limit);

        return LeaderboardRankingResource::collection($creators);
    }
}
