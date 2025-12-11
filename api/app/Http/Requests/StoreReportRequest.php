<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReportRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'type' => 'required|in:personal_rights,terms_violations',
            'reason' => 'required|string|uppercase',
            'description' => 'required|string|min:10|max:2000',
        ];
    }
}
