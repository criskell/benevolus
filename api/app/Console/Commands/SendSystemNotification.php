<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Notifications\SystemNotification;
use App\Services\Notification\NotificationService;
use Illuminate\Console\Command;

final class SendSystemNotification extends Command
{
    protected $signature = 'notification:system
        {--title-key= : Translation key for the notification title}
        {--message-key= : Translation key for the notification message}';

    protected $description = 'Send a system notification to all users';

    public function handle(NotificationService $notificationService): int
    {
        $titleKey = $this->option('title-key');
        $messageKey = $this->option('message-key');

        if (empty($titleKey) || empty($messageKey)) {
            $this->error('Both --title-key and --message-key are required.');

            return self::FAILURE;
        }

        $notification = new SystemNotification($titleKey, $messageKey);

        $this->info('Sending system notification to all users...');

        $notificationService->notifyAllUsers($notification);

        $this->info('System notification dispatched successfully.');

        return self::SUCCESS;
    }
}
