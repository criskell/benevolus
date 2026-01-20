<?php

namespace App\Http\Requests\Campaign;

use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "UpdateCampaignRequest",
    properties: [
        new OA\Property(property: "title", type: "string", maxLength: 255),
        new OA\Property(property: "description", type: "string"),
        new OA\Property(property: "goalCents", type: "integer", minimum: 1),
        new OA\Property(property: "status", type: "string", enum: ["approved", "pending", "rejected"]),
    ]
)]
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
