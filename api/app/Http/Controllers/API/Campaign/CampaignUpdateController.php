<?php
declare(strict_types=1);

namespace App\Http\Controllers\API\Campaign;

use App\Http\Controllers\Controller;
use App\Http\Requests\Campaign\StoreCampaignUpdateRequest;
use App\Http\Resources\Campaign\CampaignUpdateResource;
use App\Models\CampaignUpdate;
use App\Services\Campaign\CampaignUpdateService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use OpenApi\Attributes as OA;

final class CampaignUpdateController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', only: ['store', 'destroy']),
        ];
    }

    public function __construct(private CampaignUpdateService $campaignUpdateService) {}

    #[OA\Get(
        operationId: "listCampaignUpdates",
        path: "/api/campaigns/{campaign}/updates",
        summary: "List campaign updates",
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
                description: "Campaign updates retrieved successfully",
                content: new OA\JsonContent(
                    type: "object",
                    properties: [
                        new OA\Property(
                            property: "data",
                            type: "array",
                            items: new OA\Items(ref: "#/components/schemas/CampaignUpdateResource")
                        ),
                    ]
                )
            ),
            new OA\Response(response: 404, ref: "#/components/responses/NotFound"),
        ]
    )]
    public function index(Request $request, int $campaignId)
    {
        $updates = $this->campaignUpdateService->listByCampaign($campaignId, $request->user());

        return CampaignUpdateResource::collection($updates);
    }

    #[OA\Post(
        operationId: "createCampaignUpdate",
        path: "/api/campaigns/{campaign}/updates",
        summary: "Create campaign update",
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
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                ref: "#/components/schemas/StoreCampaignUpdateRequest"
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                content: new OA\JsonContent(
                    ref: "#/components/schemas/CampaignUpdateResource"
                )
            ),
            new OA\Response(response: 401, ref: "#/components/responses/Unauthorized"),
            new OA\Response(response: 404, ref: "#/components/responses/NotFound"),
            new OA\Response(response: 422, ref: "#/components/responses/ValidationError"),
        ]
    )]
    public function store(StoreCampaignUpdateRequest $request, int $campaignId)
    {
        $update = $this->campaignUpdateService->create($campaignId, $request->validated());

        return new CampaignUpdateResource($update);
    }

    #[OA\Get(
        operationId: "getCampaignUpdate",
        path: "/api/updates/{update}",
        summary: "Get campaign update",
        tags: ["Campaigns"],
        parameters: [
            new OA\Parameter(
                name: "update",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer"),
                description: "Update ID"
            ),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Campaign update retrieved successfully",
                content: new OA\JsonContent(
                    ref: "#/components/schemas/CampaignUpdateResource"
                )
            ),
            new OA\Response(response: 404, ref: "#/components/responses/NotFound"),
        ]
    )]
    public function show(Request $request, int $updateId)
    {
        $update = $this->campaignUpdateService->findById($updateId, $request->user());

        if (!$update) {
            abort(404);
        }

        return new CampaignUpdateResource($update);
    }

    #[OA\Delete(
        operationId: "deleteCampaignUpdate",
        path: "/api/updates/{update}",
        summary: "Delete campaign update",
        tags: ["Campaigns"],
        parameters: [
            new OA\Parameter(
                name: "update",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer"),
                description: "Update ID"
            ),
        ],
        responses: [
            new OA\Response(response: 204, ref: "#/components/responses/NoContent"),
            new OA\Response(response: 401, ref: "#/components/responses/Unauthorized"),
            new OA\Response(response: 403, ref: "#/components/responses/Forbidden"),
            new OA\Response(response: 404, ref: "#/components/responses/NotFound"),
        ]
    )]
    public function destroy(CampaignUpdate $update)
    {
        Gate::authorize('delete', $update);
        $this->campaignUpdateService->delete($update);

        return response()->noContent();
    }
}
