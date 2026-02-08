<?php
declare(strict_types=1);

namespace App\Http\Controllers\API\Leaderboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\Leaderboard\LeaderboardRankingResource;
use App\Services\Leaderboard\LeaderboardService;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

final class LeaderboardController extends Controller
{
    public function __construct(private LeaderboardService $leaderboardService) {}

    #[OA\Get(
        operationId: "getTopCampaigns",
        path: "/api/leaderboard/campaigns",
        summary: "Get top campaigns",
        tags: ["Leaderboard"],
        parameters: [
            new OA\Parameter(
                name: "limit",
                in: "query",
                required: false,
                schema: new OA\Schema(type: "integer", default: 15, minimum: 1, maximum: 100),
                description: "Number of results to return"
            ),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Top campaigns retrieved successfully",
                content: new OA\JsonContent(
                    type: "object",
                    properties: [
                        new OA\Property(
                            property: "data",
                            type: "array",
                            items: new OA\Items(ref: "#/components/schemas/LeaderboardRankingResource")
                        ),
                    ]
                )
            ),
        ]
    )]
    public function topCampaigns(Request $request)
    {
        $limit = (int) $request->get('limit', 15);
        $campaigns = $this->leaderboardService->getTopCampaigns($limit);

        return LeaderboardRankingResource::collection($campaigns);
    }

    #[OA\Get(
        operationId: "getTopDonors",
        path: "/api/leaderboard/donors",
        summary: "Get top donors",
        tags: ["Leaderboard"],
        parameters: [
            new OA\Parameter(
                name: "limit",
                in: "query",
                required: false,
                schema: new OA\Schema(type: "integer", default: 15, minimum: 1, maximum: 100),
                description: "Number of results to return"
            ),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Top donors retrieved successfully",
                content: new OA\JsonContent(
                    type: "object",
                    properties: [
                        new OA\Property(
                            property: "data",
                            type: "array",
                            items: new OA\Items(ref: "#/components/schemas/LeaderboardRankingResource")
                        ),
                    ]
                )
            ),
        ]
    )]
    public function topDonors(Request $request)
    {
        $limit = (int) $request->get('limit', 15);
        $donors = $this->leaderboardService->getTopDonors($limit);

        return LeaderboardRankingResource::collection($donors);
    }

    #[OA\Get(
        operationId: "getTopCreators",
        path: "/api/leaderboard/creators",
        summary: "Get top creators",
        tags: ["Leaderboard"],
        parameters: [
            new OA\Parameter(
                name: "limit",
                in: "query",
                required: false,
                schema: new OA\Schema(type: "integer", default: 15, minimum: 1, maximum: 100),
                description: "Number of results to return"
            ),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Top creators retrieved successfully",
                content: new OA\JsonContent(
                    type: "object",
                    properties: [
                        new OA\Property(
                            property: "data",
                            type: "array",
                            items: new OA\Items(ref: "#/components/schemas/LeaderboardRankingResource")
                        ),
                    ]
                )
            ),
        ]
    )]
    public function topCreators(Request $request)
    {
        $limit = (int) $request->get('limit', 15);
        $creators = $this->leaderboardService->getTopCreators($limit);

        return LeaderboardRankingResource::collection($creators);
    }
}
