<?php

declare(strict_types=1);

namespace App\Http\Resources\Notification;

use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'NotificationResource',
    properties: [
        new OA\Property(property: 'id', type: 'string', format: 'uuid'),
        new OA\Property(property: 'type', type: 'string', enum: ['donation', 'campaign', 'withdrawal', 'system']),
        new OA\Property(property: 'title', type: 'string'),
        new OA\Property(property: 'message', type: 'string'),
        new OA\Property(property: 'timestamp', type: 'string', format: 'date-time'),
        new OA\Property(property: 'isRead', type: 'boolean'),
    ]
)]
class NotificationResource extends JsonResource
{
    public function toArray($request): array
    {
        $data = $this->data;

        return [
            'id' => $this->id,
            'type' => $data['type'],
            'title' => __($data['titleKey'], $data['params'] ?? []),
            'message' => __($data['messageKey'], $data['params'] ?? []),
            'timestamp' => $this->created_at->toIso8601String(),
            'isRead' => $this->read_at !== null,
        ];
    }
}
