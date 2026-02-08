<?php
declare(strict_types=1);

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "CommentUpdateRequest",
    properties: [
        new OA\Property(property: "content", type: "string"),
    ]
)]
class CommentUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'content' => ['sometimes', 'string'],
        ];
    }
}
