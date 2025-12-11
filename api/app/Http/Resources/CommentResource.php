<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'user' => $this->when(!$this->is_anonymous, new UserResource($this->whenLoaded('user'))),
            'campaignId' => $this->campaign_id,
            'content' => $this->content,
            'isAnonymous' => $this->is_anonymous,
            'createdAt' => $this->created_at,
            'likes' => $this->likes_count ?? 0,
        ];
    }
}
