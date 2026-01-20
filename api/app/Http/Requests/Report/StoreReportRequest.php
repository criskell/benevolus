<?php

namespace App\Http\Requests\Report;

use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "StoreReportRequest",
    required: ["type", "reason", "description"],
    properties: [
        new OA\Property(property: "type", type: "string", enum: ["personal_rights", "terms_violations"]),
        new OA\Property(property: "reason", type: "string"),
        new OA\Property(property: "description", type: "string", minLength: 10, maxLength: 2000),
    ]
)]
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
