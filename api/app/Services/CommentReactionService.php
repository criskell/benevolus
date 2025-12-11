<?php

namespace App\Services;

use App\Models\Comment;
use App\Models\CommentReaction;

class CommentReactionService
{
    public function toggleLike(Comment $comment, int $userId): CommentReaction
    {
        $reaction = CommentReaction::where('comment_id', $comment->id)
            ->where('user_id', $userId)
            ->first();

        if ($reaction) {
            $reaction->delete();
            return $reaction;
        }

        return CommentReaction::create([
            'comment_id' => $comment->id,
            'user_id' => $userId,
            'liked' => true,
        ]);
    }
}
