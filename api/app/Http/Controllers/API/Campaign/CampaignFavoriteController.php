<?php
declare(strict_types=1);

namespace App\Http\Controllers\API\Campaign;

use App\Http\Controllers\Controller;
use App\Http\Resources\Campaign\CampaignResource;
use App\Models\Campaign;
use App\Services\Campaign\CampaignFavoriteService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use OpenApi\Attributes as OA;

final class CampaignFavoriteController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return ['auth:sanctum'];
    }

    public function __construct(private CampaignFavoriteService $campaignFavoriteService) {}

    #[OA\Get(
        operationId: "listFavoritedCampaigns",
        path: "/api/profile/campaigns/favorited",
        summary: "List favorited campaigns",
        tags: ["Campaigns"],
        responses: [
            new OA\Response(
                response: 200,
                content: new OA\JsonContent(
                    type: "object",
                    properties: [
                        new OA\Property(
                            property: "data",
                            type: "array",
                            items: new OA\Items(ref: "#/components/schemas/CampaignResource")
                        ),
                    ]
                )
            ),
            new OA\Response(response: 401, ref: "#/components/responses/Unauthorized"),
        ]
    )]
    public function index(Request $request)
    {
        $favoritedCampaigns = $this->campaignFavoriteService->listFavorites($request->user());

        return CampaignResource::collection($favoritedCampaigns);
    }

    #[OA\Post(
        operationId: "toggleCampaignFavorite",
        path: "/api/campaigns/{campaign}/favorite",
        summary: "Toggle campaign favorite",
        tags: ["Campaigns"],
        parameters: [
            new OA\Parameter(
                name: "campaign",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer"),
                description: "Campaign ID"
            ),
        ],
        responses: [
            new OA\Response(
                response: 200,
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "favorited", type: "boolean"),
                    ],
                    type: "object"
                )
            ),
            new OA\Response(response: 401, ref: "#/components/responses/Unauthorized"),
            new OA\Response(response: 404, ref: "#/components/responses/NotFound"),
        ]
    )]
    public function toggle(Request $request, Campaign $campaign)
    {
        $favorited = $this->campaignFavoriteService->toggleFavorite($request->user(), $campaign);

        return response()->json([
            'favorited' => $favorited,
        ]);
    }
}
