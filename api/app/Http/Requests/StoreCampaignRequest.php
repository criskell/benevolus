<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCampaignRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'goalCents' => 'required|numeric|min:1',
        ];
    }

    public function attributes(): array
    {
        return [
            'goalCents' => 'goal_cents',
        ];
    }
}
