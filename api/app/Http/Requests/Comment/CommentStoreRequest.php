<?php

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;

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
