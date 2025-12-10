<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentStoreRequest;
use App\Http\Requests\CommentUpdateRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Services\CommentService;

class CommentController extends Controller
{
    public function __construct(private CommentService $commentService) {}

    public function index(int $campaign)
    {
        $comments = Comment::where('campaign_id', $campaign)->latest()->paginate();

        return CommentResource::collection($comments);
    }

    public function store(CommentStoreRequest $request)
    {
        $comment = $this->commentService->create($request->user(), $request->validated());

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
