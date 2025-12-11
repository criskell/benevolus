<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentStoreRequest;
use App\Http\Requests\CommentUpdateRequest;
use App\Http\Resources\CommentResource;
use App\Models\Campaign;
use App\Models\Comment;
use App\Services\CommentService;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class CommentController extends Controller implements HasMiddleware
{
    public function __construct(private CommentService $commentService) {}

    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', only: ['store', 'update', 'destroy']),
        ];
    }

    public function index(int $campaign)
    {
        $comments = Comment::withCount('likes')->where('campaign_id', $campaign)->latest()->paginate();

        return CommentResource::collection($comments);
    }

    public function store(Campaign $campaign, CommentStoreRequest $request)
    {
        $comment = $this->commentService->create($request->user(), $campaign, $request->validated());

        return new CommentResource($comment);
    }

    public function update(CommentUpdateRequest $request, Comment $comment)
    {
        $updated = $this->commentService->update($comment, $request->validated());

        return new CommentResource($updated);
    }

    public function destroy(Comment $comment)
    {
        $this->commentService->delete($comment);

        return response()->noContent();
    }
}
