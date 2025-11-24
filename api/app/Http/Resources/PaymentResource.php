<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "PaymentResource",

    properties: [
        new OA\Property(property: "method", type: "string"),
        new OA\Property(property: "status", type: "string"),
        new OA\Property(property: "pixCode", type: "string"),
        new OA\Property(property: "qrCodeUrl", type: "string"),
        new OA\Property(property: "expiresAt", type: "string")
    ]
)]
class PaymentResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'method' => $this->resource['method'] ?? null,
            'status' => $this->resource['status'] ?? 'pending',
            'pixCode' => $this->resource['pix_code'] ?? null,
            'qrCodeUrl' => $this->resource['qr_code'] ?? null,
            'expiresAt' => $this->resource['expires_at'] ?? null,
        ];
    }
}
