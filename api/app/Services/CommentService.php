<?php

namespace App\Services;

use App\Models\Comment;
use App\Models\User;

class CommentService
{
    public function create(User $user, array $data): Comment
    {
        $data['user_id'] = $user->id;
        return Comment::create($data);
    }

    public function update(Comment $comment, array $data): Comment
    {
        $comment->update($data);
        return $comment;
    }

    public function delete(Comment $comment): void
    {
        $comment->delete();
    }
}
