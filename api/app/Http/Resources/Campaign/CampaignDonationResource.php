<?php
declare(strict_types=1);

namespace App\Http\Resources\Campaign;

use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "CampaignDonationResource",
    properties: [
        new OA\Property(property: "donor_name", type: "string"),
        new OA\Property(property: "amount_cents", type: "integer"),
        new OA\Property(property: "created_at", type: "string", format: "date-time"),
    ]
)]
class CampaignDonationResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'donor_name' => $this->user->name,
            'amount_cents' => $this->amount_cents,
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
