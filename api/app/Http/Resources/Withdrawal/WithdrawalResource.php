<?php
declare(strict_types=1);

namespace App\Http\Resources\Withdrawal;

use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "WithdrawalResource",
    properties: [
        new OA\Property(property: "id", type: "integer"),
        new OA\Property(property: "campaignId", type: "integer"),
        new OA\Property(property: "amountCents", type: "integer"),
        new OA\Property(property: "status", type: "string"),
        new OA\Property(property: "pixKey", type: "string"),
        new OA\Property(property: "pixKeyType", type: "string"),
        new OA\Property(property: "paidAt", type: "string", format: "date-time", nullable: true),
        new OA\Property(property: "createdAt", type: "string", format: "date-time"),
        new OA\Property(property: "updatedAt", type: "string", format: "date-time"),
        new OA\Property(
            property: "campaign",
            ref: "#/components/schemas/CampaignResource",
            type: "object",
            nullable: true
        ),
    ]
)]
class WithdrawalResource extends JsonResource
{
    public function toArray($request)
    {
        $paidAt = $this->paid_at ?? null;

        return [
            'id' => $this->id,
            'campaignId' => $this->campaign_id,
            'amountCents' => $this->amountCents,
            'status' => $this->status,
            'pixKey' => $this->pix_key,
            'pixKeyType' => $this->pix_key_type,
            'paidAt' => $paidAt?->toDateTimeString(),
            'createdAt' => $this->created_at->toDateTimeString(),
            'updatedAt' => $this->updated_at->toDateTimeString(),
            'campaign' => $this->whenLoaded('campaign'),
        ];
    }
}
