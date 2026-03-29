<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\Campaign;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

final class CampaignApproved extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private Campaign $campaign
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'campaign',
            'titleKey' => 'notifications.campaign.title',
            'messageKey' => 'notifications.campaign.message',
            'params' => [
                'campaign' => $this->campaign->title,
                'campaignSlug' => $this->campaign->slug,
            ],
        ];
    }
}
