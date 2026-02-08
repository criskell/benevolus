<?php
declare(strict_types=1);

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DonationPaid implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public string $externalReference) {}

    public function broadcastOn(): array
    {
        return [
            new Channel('donation.paid.' . $this->externalReference),
        ];
    }

    public function broadcastAs(): string
    {
        return 'donation.paid';
    }
}
