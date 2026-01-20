<?php

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "CommentStoreRequest",
    required: ["content", "is_anonymous"],
    properties: [
        new OA\Property(property: "content", type: "string"),
        new OA\Property(property: "is_anonymous", type: "boolean"),
    ]
)]
class CommentStoreRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'content' => 'required|string',
            'is_anonymous' => 'required|boolean',
        ];
    }
}
