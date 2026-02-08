<?php

namespace App\Http\Controllers\API\Campaign;

use App\Http\Controllers\Controller;
use App\Http\Requests\Campaign\UploadCampaignImageRequest;
use App\Http\Resources\Campaign\CampaignMediaAssetResource;
use App\Models\Campaign;
use App\Services\Campaign\CampaignImageService;
use Illuminate\Support\Facades\Gate;
use OpenApi\Attributes as OA;

final class CampaignImageController extends Controller
{
    public function __construct(private CampaignImageService $campaignImageService) {}

    #[OA\Post(
        operationId: "uploadCampaignImage",
        path: "/api/campaigns/{campaign}/images",
        summary: "Upload campaign image",
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
            content: new OA\MediaType(
                mediaType: "multipart/form-data",
                schema: new OA\Schema(
                    required: ["image"],
                    properties: [
                        new OA\Property(
                            property: "image",
                            type: "string",
                            format: "binary",
                            description: "Image file (jpg, jpeg, png, max 4MB)"
                        ),
                    ]
                )
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: "Image uploaded successfully",
                content: new OA\JsonContent(
                    ref: "#/components/schemas/CampaignMediaAssetResource"
                )
            ),
            new OA\Response(response: 401, ref: "#/components/responses/Unauthorized"),
            new OA\Response(response: 403, ref: "#/components/responses/Forbidden"),
            new OA\Response(response: 404, ref: "#/components/responses/NotFound"),
            new OA\Response(response: 422, ref: "#/components/responses/ValidationError"),
        ]
    )]
    public function store(Campaign $campaign, UploadCampaignImageRequest $request)
    {
        Gate::authorize('update', $campaign);

        $image = $this->campaignImageService->store($campaign, $request->file('image'));

        return new CampaignMediaAssetResource($image);
    }
}
