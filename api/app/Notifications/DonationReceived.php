<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\Donation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

final class DonationReceived extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private Donation $donation
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'donation',
            'titleKey' => 'notifications.donation.title',
            'messageKey' => 'notifications.donation.message',
            'params' => [
                'amount' => 'R$ '.number_format($this->donation->amount_cents / 100, 2, ',', '.'),
                'campaign' => $this->donation->campaign->title,
                'campaignSlug' => $this->donation->campaign->slug,
            ],
        ];
    }
}
