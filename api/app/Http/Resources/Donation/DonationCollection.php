<?php
declare(strict_types=1);

namespace App\Http\Resources\Donation;

use OpenApi\Attributes as OA;
use Illuminate\Http\Resources\Json\ResourceCollection;

#[OA\Schema(
    schema: "DonationCollection",
    properties: [
        new OA\Property(
            property: "data",
            type: "array",
            items: new OA\Items(ref: "#/components/schemas/DonationResource")
        ),
        new OA\Property(
            property: "meta",
            properties: [
                new OA\Property(property: "total", type: "integer"),
                new OA\Property(property: "perPage", type: "integer"),
                new OA\Property(property: "currentPage", type: "integer"),
                new OA\Property(property: "lastPage", type: "integer"),
            ],
            type: "object",
        ),
        new OA\Property(
            property: "links",
            properties: [
                new OA\Property(property: "first", type: "string"),
                new OA\Property(property: "last", type: "string"),
                new OA\Property(property: "prev", type: "string", nullable: true),
                new OA\Property(property: "next", type: "string", nullable: true),
            ]
        )
    ]
)]
class DonationCollection extends ResourceCollection
{
    public function toArray($request): array
    {
        return [
            'data' => $this->collection,
            'meta' => [
                'total' => $this->total(),
                'perPage' => $this->perPage(),
                'currentPage' => $this->currentPage(),
                'lastPage' => $this->lastPage(),
            ],
            'links' => [
                'first' => $this->url(1),
                'last' => $this->url($this->lastPage()),
                'prev' => $this->previousPageUrl(),
                'next' => $this->nextPageUrl(),
            ],
        ];
    }
}
