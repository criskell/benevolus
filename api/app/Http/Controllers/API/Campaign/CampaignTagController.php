<?php

declare(strict_types=1);

namespace App\Http\Controllers\API\Campaign;

use App\Http\Controllers\Controller;
use App\Http\Requests\Campaign\AssociateCampaignTagsRequest;
use App\Http\Resources\Campaign\TagResource;
use App\Models\Campaign;
use App\Models\Tag;
use App\Services\Campaign\CampaignTagService;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Gate;
use OpenApi\Attributes as OA;

final class CampaignTagController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return ['auth:sanctum'];
    }

    public function __construct(private CampaignTagService $campaignTagService) {}

    #[OA\Post(
        operationId: 'associateCampaignTags',
        path: '/api/campaigns/{campaign}/tags',
        summary: 'Associate tags to a campaign',
        tags: ['Campaigns'],
        parameters: [
            new OA\Parameter(
                name: 'campaign',
                in: 'path',
                required: true,
                schema: new OA\Schema(type: 'integer'),
                description: 'Campaign ID'
            ),
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(ref: '#/components/schemas/AssociateCampaignTagsRequest')
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: 'Tags associated successfully',
                content: new OA\JsonContent(
                    type: 'array',
                    items: new OA\Items(ref: '#/components/schemas/TagResource')
                )
            ),
            new OA\Response(response: 403, description: 'Forbidden'),
            new OA\Response(response: 422, description: 'Validation error'),
        ]
    )]
    public function store(AssociateCampaignTagsRequest $request, Campaign $campaign)
    {
        Gate::authorize('update', $campaign);

        $tags = $this->campaignTagService->associateTags($campaign, $request->validated()['tags']);

        return TagResource::collection($tags);
    }

    #[OA\Delete(
        operationId: 'disassociateCampaignTag',
        path: '/api/campaigns/{campaign}/tags/{tag}',
        summary: 'Remove a tag association from a campaign',
        tags: ['Campaigns'],
        parameters: [
            new OA\Parameter(
                name: 'campaign',
                in: 'path',
                required: true,
                schema: new OA\Schema(type: 'integer'),
                description: 'Campaign ID'
            ),
            new OA\Parameter(
                name: 'tag',
                in: 'path',
                required: true,
                schema: new OA\Schema(type: 'integer'),
                description: 'Tag ID'
            ),
        ],
        responses: [
            new OA\Response(response: 204, description: 'Tag disassociated successfully'),
            new OA\Response(response: 403, description: 'Forbidden'),
        ]
    )]
    public function destroy(Campaign $campaign, Tag $tag)
    {
        Gate::authorize('update', $campaign);

        $this->campaignTagService->disassociateTag($campaign, $tag);

        return response()->noContent();
    }
}
