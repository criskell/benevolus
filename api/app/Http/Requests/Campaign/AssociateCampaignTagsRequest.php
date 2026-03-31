<?php

declare(strict_types=1);

namespace App\Http\Requests\Campaign;

use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'AssociateCampaignTagsRequest',
    required: ['tags'],
    properties: [
        new OA\Property(
            property: 'tags',
            type: 'array',
            items: new OA\Items(type: 'string', maxLength: 50),
            minItems: 1,
            maxItems: 10
        ),
    ]
)]
class AssociateCampaignTagsRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'tags' => 'required|array|min:1|max:10',
            'tags.*' => 'required|string|max:50',
        ];
    }
}
