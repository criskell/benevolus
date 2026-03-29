<?php

declare(strict_types=1);

namespace App\Http\Controllers\API\Notification;

use App\Http\Controllers\Controller;
use App\Http\Resources\Notification\NotificationResource;
use App\Services\Notification\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use OpenApi\Attributes as OA;

final class NotificationController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum'),
        ];
    }

    public function __construct(
        private NotificationService $notificationService
    ) {}

    #[OA\Get(
        operationId: 'listNotifications',
        path: '/api/notifications',
        summary: 'List authenticated user notifications',
        security: [['bearerAuth' => []]],
        tags: ['Notifications'],
        parameters: [
            new OA\Parameter(
                name: 'page',
                in: 'query',
                required: false,
                schema: new OA\Schema(type: 'integer'),
                description: 'Page number'
            ),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Notifications retrieved successfully',
                content: new OA\JsonContent(
                    type: 'object',
                    properties: [
                        new OA\Property(
                            property: 'data',
                            type: 'array',
                            items: new OA\Items(ref: '#/components/schemas/NotificationResource')
                        ),
                        new OA\Property(
                            property: 'meta',
                            type: 'object',
                            properties: [
                                new OA\Property(property: 'unreadCount', type: 'integer'),
                            ]
                        ),
                    ]
                )
            ),
        ]
    )]
    public function index(Request $request)
    {
        $user = $request->user();
        $notifications = $this->notificationService->listForUser($user);
        $unreadCount = $this->notificationService->unreadCount($user);

        return NotificationResource::collection($notifications)
            ->additional(['meta' => ['unreadCount' => $unreadCount]]);
    }

    #[OA\Post(
        operationId: 'markNotificationAsRead',
        path: '/api/notifications/{id}/read',
        summary: 'Mark a notification as read',
        security: [['bearerAuth' => []]],
        tags: ['Notifications'],
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                schema: new OA\Schema(type: 'string', format: 'uuid'),
                description: 'Notification ID'
            ),
        ],
        responses: [
            new OA\Response(response: 204, description: 'Notification marked as read'),
        ]
    )]
    public function markAsRead(Request $request, string $id)
    {
        $this->notificationService->markAsRead($request->user(), $id);

        return response()->noContent();
    }

    #[OA\Post(
        operationId: 'markAllNotificationsAsRead',
        path: '/api/notifications/read-all',
        summary: 'Mark all notifications as read',
        security: [['bearerAuth' => []]],
        tags: ['Notifications'],
        responses: [
            new OA\Response(response: 204, description: 'All notifications marked as read'),
        ]
    )]
    public function markAllAsRead(Request $request)
    {
        $this->notificationService->markAllAsRead($request->user());

        return response()->noContent();
    }

    #[OA\Delete(
        operationId: 'deleteNotification',
        path: '/api/notifications/{id}',
        summary: 'Delete a notification',
        security: [['bearerAuth' => []]],
        tags: ['Notifications'],
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                schema: new OA\Schema(type: 'string', format: 'uuid'),
                description: 'Notification ID'
            ),
        ],
        responses: [
            new OA\Response(response: 204, description: 'Notification deleted'),
        ]
    )]
    public function destroy(Request $request, string $id)
    {
        $this->notificationService->delete($request->user(), $id);

        return response()->noContent();
    }
}
