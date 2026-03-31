<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\Withdrawal;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

final class WithdrawalProcessed extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private Withdrawal $withdrawal
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'withdrawal',
            'titleKey' => 'notifications.withdrawal.title',
            'messageKey' => 'notifications.withdrawal.message',
            'params' => [
                'amount' => 'R$ '.number_format($this->withdrawal->amountCents / 100, 2, ',', '.'),
                'campaign' => $this->withdrawal->campaign->title,
            ],
        ];
    }
}
