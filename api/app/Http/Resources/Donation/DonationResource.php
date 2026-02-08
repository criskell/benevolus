<?php
declare(strict_types=1);

namespace App\Http\Resources\Donation;

use App\Http\Resources\Campaign\CampaignResource;
use App\Http\Resources\User\DonorResource;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "DonationResource",
    properties: [
        new OA\Property(property: "id", type: "integer"),
        new OA\Property(property: "amountCents", type: "number"),
        new OA\Property(property: "isAnonymous", type: "boolean"),
        new OA\Property(property: "paymentStatus", type: "string"),
        new OA\Property(property: "paymentMethod", type: "string"),
        new OA\Property(property: "externalReference", type: "string", nullable: true),
        new OA\Property(property: "paidAt", type: "string", format: "date-time"),
        new OA\Property(property: "createdAt", type: "string", format: "date-time"),
        new OA\Property(property: "updatedAt", type: "string", format: "date-time"),
        new OA\Property(
            property: "donor",
            ref: "#/components/schemas/DonorResource",
            type: "object",
            nullable: true
        ),
        new OA\Property(
            property: "campaign",
            ref: "#/components/schemas/CampaignResource",
            type: "object",
            nullable: true
        ),
    ]
)]
class DonationResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'amountCents' => $this->amount_cents,
            'isAnonymous' => (bool) $this->is_anonymous,
            'paymentStatus' => $this->payment_status,
            'paymentMethod' => $this->payment_method,
            'externalReference' => $this->external_reference,
            'paidAt' => $this->paid_at,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'donor' => $this->when(
                !$this->is_anonymous && $this->relationLoaded('user'),
                new DonorResource($this->user)
            ),
            'campaign' => $this->when(
                $this->relationLoaded('campaign'),
                new CampaignResource($this->campaign)
            ),
        ];
    }
}
