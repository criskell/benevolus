<?php

namespace App\Http\Requests\Campaign;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCampaignRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'goalCents' => 'sometimes|required|numeric|min:1',
            'status' => 'sometimes|required|in:approved,pending,rejected',
        ];
    }
}
