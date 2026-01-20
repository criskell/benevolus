<?php

namespace App\Http\Controllers\API\Comment;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Services\Comment\CommentReactionService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use OpenApi\Attributes as OA;

final class CommentReactionController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return ['auth:sanctum'];
    }

    public function __construct(private CommentReactionService $commentReactionService) {}

    #[OA\Post(
        operationId: "toggleCommentReaction",
        path: "/api/comments/{comment}/react",
        summary: "Toggle comment reaction",
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
            new OA\Response(response: 404, ref: "#/components/responses/NotFound"),
        ]
    )]
    public function toggle(Request $request, Comment $comment)
    {
        $this->commentReactionService->toggleLike($comment, $request->user()->id);

        return response()->noContent();
    }
}
