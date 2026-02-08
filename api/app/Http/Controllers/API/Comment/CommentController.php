<?php

namespace App\Http\Controllers\API\Comment;

use App\Http\Controllers\Controller;
use App\Http\Requests\Comment\CommentStoreRequest;
use App\Http\Requests\Comment\CommentUpdateRequest;
use Illuminate\Support\Facades\Gate;
use App\Http\Resources\Comment\CommentResource;
use App\Models\Campaign;
use App\Models\Comment;
use App\Services\Comment\CommentService;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use OpenApi\Attributes as OA;

final class CommentController extends Controller implements HasMiddleware
{
    public function __construct(private CommentService $commentService) {}

    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', only: ['store', 'update', 'destroy']),
        ];
    }

    #[OA\Get(
        operationId: "listCampaignComments",
        path: "/api/campaigns/{campaign}/comments",
        summary: "List campaign comments",
        tags: ["Comments"],
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
                description: "Comments retrieved successfully",
                content: new OA\JsonContent(
                    type: "object",
                    properties: [
                        new OA\Property(
                            property: "data",
                            type: "array",
                            items: new OA\Items(ref: "#/components/schemas/CommentResource")
                        ),
                    ]
                )
            ),
            new OA\Response(response: 404, ref: "#/components/responses/NotFound"),
        ]
    )]
    public function index(Campaign $campaign)
    {
        $comments = Comment::withCount('likes')->where('campaign_id', $campaign->id)->latest()->paginate();

        return CommentResource::collection($comments);
    }

    #[OA\Post(
        operationId: "createComment",
        path: "/api/campaigns/{campaign}/comments",
        summary: "Create a comment",
        tags: ["Comments"],
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
                ref: "#/components/schemas/CommentStoreRequest"
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: "Comment created successfully",
                content: new OA\JsonContent(
                    ref: "#/components/schemas/CommentResource"
                )
            ),
            new OA\Response(response: 401, ref: "#/components/responses/Unauthorized"),
            new OA\Response(response: 404, ref: "#/components/responses/NotFound"),
            new OA\Response(response: 422, ref: "#/components/responses/ValidationError"),
        ]
    )]
    public function store(Campaign $campaign, CommentStoreRequest $request)
    {
        $comment = $this->commentService->create($request->user(), $campaign, $request->validated());

        return new CommentResource($comment);
    }

    #[OA\Put(
        operationId: "updateComment",
        path: "/api/comments/{comment}",
        summary: "Update comment",
        tags: ["Comments"],
        parameters: [
            new OA\Parameter(
                name: "comment",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer"),
                description: "Comment ID"
            ),
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                ref: "#/components/schemas/CommentUpdateRequest"
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Comment updated successfully",
                content: new OA\JsonContent(
                    ref: "#/components/schemas/CommentResource"
                )
            ),
            new OA\Response(response: 401, ref: "#/components/responses/Unauthorized"),
            new OA\Response(response: 403, ref: "#/components/responses/Forbidden"),
            new OA\Response(response: 404, ref: "#/components/responses/NotFound"),
            new OA\Response(response: 422, ref: "#/components/responses/ValidationError"),
        ]
    )]
    public function update(CommentUpdateRequest $request, Comment $comment)
    {
        Gate::authorize('update', $comment);
        $updated = $this->commentService->update($comment, $request->validated());

        return new CommentResource($updated);
    }

    #[OA\Delete(
        operationId: "deleteComment",
        path: "/api/comments/{comment}",
        summary: "Delete comment",
        tags: ["Comments"],
        parameters: [
            new OA\Parameter(
                name: "comment",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer"),
                description: "Comment ID"
            ),
        ],
        responses: [
            new OA\Response(response: 204, ref: "#/components/responses/NoContent"),
            new OA\Response(response: 401, ref: "#/components/responses/Unauthorized"),
            new OA\Response(response: 403, ref: "#/components/responses/Forbidden"),
            new OA\Response(response: 404, ref: "#/components/responses/NotFound"),
        ]
    )]
    public function destroy(Comment $comment)
    {
        Gate::authorize('delete', $comment);
        $this->commentService->delete($comment);

        return response()->noContent();
    }
}
