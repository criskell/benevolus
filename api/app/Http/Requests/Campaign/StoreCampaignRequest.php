<?php

namespace App\Http\Requests\Campaign;

use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "StoreCampaignRequest",
    required: ["title", "description", "goalCents"],
    properties: [
        new OA\Property(property: "title", type: "string", maxLength: 255),
        new OA\Property(property: "description", type: "string"),
        new OA\Property(property: "goalCents", type: "integer", minimum: 1),
        new OA\Property(property: "expiresAt", type: "string", format: "date-time", nullable: true),
    ]
)]
class StoreCampaignRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'goalCents' => 'required|numeric|min:1',
            'expiresAt' => 'nullable|date',
        ];
    }

    public function attributes(): array
    {
        return [
            'goalCents' => 'goal_cents',
        ];
    }
}
