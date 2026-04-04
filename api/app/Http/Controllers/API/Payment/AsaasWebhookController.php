<?php

declare(strict_types=1);

namespace App\Http\Controllers\API\Payment;

use App\Events\DonationPaid;
use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Notifications\DonationReceived;
use Illuminate\Http\Request;

final class AsaasWebhookController extends Controller
{
    public function receive(Request $request)
    {
        if (! $this->validateWebhookToken($request)) {
            return response()->json([
                'errors' => [['message' => 'Invalid webhook token.']],
            ], 401);
        }

        return $this->handleWebhook($request);
    }

    private function validateWebhookToken(Request $request): bool
    {
        $token = $request->header('asaas-access-token');

        return $token && $token === config('services.asaas.webhook_token');
    }

    private function handleWebhook(Request $request)
    {
        $event = $request->input('event');

        if (in_array($event, ['PAYMENT_RECEIVED', 'PAYMENT_CONFIRMED'])) {
            return $this->handlePaymentConfirmed($request);
        }

        return response()->json(['message' => 'Event acknowledged.']);
    }

    private function handlePaymentConfirmed(Request $request)
    {
        $externalReference = $request->input('payment.externalReference');

        $donation = Donation::where('external_reference', $externalReference)->first();

        if (! $donation) {
            return response()->json([
                'errors' => [['message' => 'Donation not found.']],
            ], 404);
        }

        if ($donation->payment_status === 'paid') {
            return response()->json(['message' => 'Already processed.']);
        }

        $donation->payment_status = 'paid';
        $donation->paid_at = now();
        $donation->save();

        $amount = $donation->amount_cents;
        $donation->campaign->increment('available_balance_cents', $amount);

        event(new DonationPaid($donation->external_reference));

        $donation->campaign->user->notify(new DonationReceived($donation->load('campaign')));

        return response()->json(['message' => 'Success.']);
    }
}
