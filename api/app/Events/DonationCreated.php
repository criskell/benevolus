<?php

namespace App\Events;

use App\Models\Donation;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DonationCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Donation $donation) {}
}
