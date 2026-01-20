<?php

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;

class CommentUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'content' => ['sometimes', 'string'],
        ];
    }
}
