<?php

namespace App\Services;

use App\DTO\Donation\DonationDTO;
use App\Models\Donation;
use App\Models\User;
use Illuminate\Database\ConnectionInterface;

class DonationService
{
    public function create(array $attributes): Donation
    {
        return Donation::create($attributes);
    }

    public function createFromPayment(
        User $user,
        int $amount,
        string $paymentMethod,
        string $paymentId,
        ?int $campaignId = null,
        bool $isAnonymous = false
    ) {
        return $this->create([
            // FIXME: I need to store the user information for debugging, legal, etc. purposes only.
            'user_id' => $isAnonymous ? null : $user->id,
            'campaign_id' => $campaignId,
            'amount' => $amount,
            'payment_method' => $paymentMethod,
            'payment_status' => 'pending',
            'payment_processor' => 'stripe',
            'external_reference_id' => $paymentId,
            'paid_at' => null,
        ]);
    }

    public function updateStatus(Donation $donation, string $status): Donation
    {
        $donation->update(['payment_status' => $status]);
        return $donation->fresh();
    }

    public function markAsPaid(Donation $donation): Donation
    {
        $donation->update([
            'payment_status' => 'paid',
            'paid_at' => now(),
        ]);

        return $donation->fresh();
    }

    public function findById(int $id): ?Donation
    {
        return Donation::find($id);
    }

    public function findByExternalReference(string $externalReference): ?Donation
    {
        return Donation::where('external_reference_id', $externalReference)
            ->first();
    }

    public function getDonationsByUser(int $userId, int $perPage = 15)
    {
        return Donation::where('user_id', $userId)
            ->with('campaign')
            ->latest()
            ->paginate($perPage);
    }

    public function getDonationsByCampaign(int $campaignId, int $perPage = 15)
    {
        return Donation::where('campaign_id', $campaignId)
            ->where('payment_status', 'paid')
            ->with('user')
            ->latest('paid_at')
            ->paginate($perPage);
    }
}
