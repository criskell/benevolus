<?php

namespace App\Http\Controllers\API\Comment;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Services\Comment\CommentReactionService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;

class CommentReactionController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return ['auth:sanctum'];
    }

    public function __construct(private CommentReactionService $commentReactionService) {}

    public function toggle(Request $request, Comment $comment)
    {
        $this->commentReactionService->toggleLike($comment, $request->user()->id);

        return response()->noContent();
    }
}
