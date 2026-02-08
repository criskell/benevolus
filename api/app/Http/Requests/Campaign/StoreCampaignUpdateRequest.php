<?php

namespace App\Http\Requests\Campaign;

use App\Models\Campaign;
use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "StoreCampaignUpdateRequest",
    required: ["title", "content", "visibleToDonorsOnly"],
    properties: [
        new OA\Property(property: "title", type: "string", maxLength: 255),
        new OA\Property(property: "content", type: "string"),
        new OA\Property(property: "visibleToDonorsOnly", type: "boolean"),
    ]
)]
class StoreCampaignUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        $campaign = Campaign::find($this->route('campaign'));

        return $campaign && $this->user()?->can('update', $campaign);
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'visibleToDonorsOnly' => 'required|boolean',
        ];
    }
}
