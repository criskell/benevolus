<?php

namespace App\Http\Resources;

use App\DTO\Payment\PaymentDTO;
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
            'method' => $this->resource->method ?? null,
            'status' => $this->resource->status ?? 'pending',
            'pixCode' => $this->resource->pixCode ?? null,
            'qrCodeUrl' => $this->resource->qrCode ?? null,
            'expiresAt' => $this->resource->expiresAt ?? null,
        ];
    }
}
