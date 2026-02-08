<?php
declare(strict_types=1);

namespace App\Services\Comment;

use App\Models\Campaign;
use App\Models\Comment;
use App\Models\User;

final class CommentService
{
    public function create(User $user, Campaign $campaign, array $data): Comment
    {
        $data['campaign_id'] = $campaign->id;
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
