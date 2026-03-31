<?php

declare(strict_types=1);

namespace App\Mail;

use App\Models\Campaign;
use App\Models\Donation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DonorThankedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public Donation $donation,
        public Campaign $campaign,
        public string $thankYouMessage,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Agradecimento pela sua doação em {$this->campaign->title}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.donor-thanked',
        );
    }
}
