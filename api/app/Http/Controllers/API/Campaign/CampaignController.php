<?php

namespace App\Http\Controllers\API\Campaign;

use App\Http\Controllers\Controller;
use App\Http\Requests\Campaign\StoreCampaignRequest;
use App\Http\Requests\Campaign\UpdateCampaignRequest;
use App\Http\Resources\Campaign\CampaignResource;
use App\Models\Campaign;
use App\Services\Campaign\CampaignService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use OpenApi\Attributes as OA;

final class CampaignController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', only: ['store', 'update', 'destroy']),
        ];
    }

    public function __construct(private CampaignService $campaignService) {}

    #[OA\Get(
        operationId: "listCampaigns",
        path: "/api/campaigns",
        summary: "List campaigns",
        tags: ["Campaigns"],
        parameters: [
            new OA\Parameter(
                name: "status",
                in: "query",
                required: false,
                schema: new OA\Schema(type: "string"),
                description: "Filter by campaign status"
            ),
            new OA\Parameter(
                name: "userId",
                in: "query",
                required: false,
                schema: new OA\Schema(type: "integer"),
                description: "Filter by user ID"
            ),
            new OA\Parameter(
                name: "search",
                in: "query",
                required: false,
                schema: new OA\Schema(type: "string"),
                description: "Search term"
            ),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Campaigns retrieved successfully",
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
        ]
    )]
    public function index(Request $request)
    {
        $filters = $request->only(['status', 'userId', 'search']);
        $campaigns = $this->campaignService->list($filters);

        return CampaignResource::collection($campaigns);
    }

    #[OA\Get(
        operationId: "getCampaign",
        path: "/api/campaigns/{id}",
        summary: "Get campaign by ID",
        tags: ["Campaigns"],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer"),
                description: "Campaign ID"
            ),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Campaign retrieved successfully",
                content: new OA\JsonContent(
                    ref: "#/components/schemas/CampaignResource"
                )
            ),
            new OA\Response(response: 404, ref: "#/components/responses/NotFound"),
        ]
    )]
    public function show(int $id)
    {
        $campaign = $this->campaignService->findById($id);

        return new CampaignResource($campaign);
    }

    #[OA\Post(
        operationId: "createCampaign",
        path: "/api/campaigns",
        summary: "Create a new campaign",
        tags: ["Campaigns"],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                ref: "#/components/schemas/StoreCampaignRequest"
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: "Campaign created successfully",
                content: new OA\JsonContent(
                    ref: "#/components/schemas/CampaignResource"
                )
            ),
            new OA\Response(response: 401, ref: "#/components/responses/Unauthorized"),
            new OA\Response(response: 422, ref: "#/components/responses/ValidationError"),
        ]
    )]
    public function store(StoreCampaignRequest $request)
    {
        $campaign = $this->campaignService->create($request->validated(), $request->user());

        return new CampaignResource($campaign);
    }

    #[OA\Put(
        operationId: "updateCampaign",
        path: "/api/campaigns/{id}",
        summary: "Update campaign",
        tags: ["Campaigns"],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer"),
                description: "Campaign ID"
            ),
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                ref: "#/components/schemas/UpdateCampaignRequest"
            )
        ),
        responses: [
            new OA\Response(response: 204, ref: "#/components/responses/NoContent"),
            new OA\Response(response: 401, ref: "#/components/responses/Unauthorized"),
            new OA\Response(response: 403, ref: "#/components/responses/Forbidden"),
            new OA\Response(response: 404, ref: "#/components/responses/NotFound"),
            new OA\Response(response: 422, ref: "#/components/responses/ValidationError"),
        ]
    )]
    public function update(UpdateCampaignRequest $request, Campaign $campaign)
    {
        Gate::authorize('update', $campaign);

        $this->campaignService->update($campaign, $request->validated());

        return response()->noContent();
    }

    #[OA\Delete(
        operationId: "deleteCampaign",
        path: "/api/campaigns/{id}",
        summary: "Delete campaign",
        tags: ["Campaigns"],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer"),
                description: "Campaign ID"
            ),
        ],
        responses: [
            new OA\Response(response: 204, ref: "#/components/responses/NoContent"),
            new OA\Response(response: 401, ref: "#/components/responses/Unauthorized"),
            new OA\Response(response: 403, ref: "#/components/responses/Forbidden"),
            new OA\Response(response: 404, ref: "#/components/responses/NotFound"),
        ]
    )]
    public function destroy(Campaign $campaign)
    {
        Gate::authorize('delete', $campaign);

        $this->campaignService->delete($campaign);

        return response()->noContent();
    }
}
