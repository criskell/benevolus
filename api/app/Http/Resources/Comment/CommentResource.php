<?php

namespace App\Http\Resources\Comment;

use App\Http\Resources\User\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "CommentResource",
    properties: [
        new OA\Property(property: "id", type: "integer"),
        new OA\Property(property: "campaignId", type: "integer"),
        new OA\Property(property: "content", type: "string"),
        new OA\Property(property: "isAnonymous", type: "boolean"),
        new OA\Property(property: "likes", type: "integer"),
        new OA\Property(property: "createdAt", type: "string", format: "date-time"),
        new OA\Property(
            property: "user",
            ref: "#/components/schemas/UserResource",
            type: "object",
            nullable: true
        ),
    ]
)]
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
