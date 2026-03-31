<?php

declare(strict_types=1);

namespace App\Services\Notification;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Notification as NotificationFacade;

final class NotificationService
{
    public function listForUser(User $user): LengthAwarePaginator
    {
        return $user->notifications()->latest()->paginate(15);
    }

    public function unreadCount(User $user): int
    {
        return $user->unreadNotifications()->count();
    }

    public function markAsRead(User $user, string $notificationId): void
    {
        $user->notifications()->findOrFail($notificationId)->markAsRead();
    }

    public function markAllAsRead(User $user): void
    {
        $user->unreadNotifications->markAsRead();
    }

    public function delete(User $user, string $notificationId): void
    {
        $user->notifications()->findOrFail($notificationId)->delete();
    }

    public function notifyAllUsers(Notification $notification): void
    {
        User::chunk(100, function ($users) use ($notification) {
            NotificationFacade::send($users, $notification);
        });
    }
}
