<?php

declare(strict_types=1);

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

final class SystemNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private string $titleKey,
        private string $messageKey,
        private array $params = []
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'system',
            'titleKey' => $this->titleKey,
            'messageKey' => $this->messageKey,
            'params' => $this->params,
        ];
    }
}
