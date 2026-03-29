<?php

declare(strict_types=1);

namespace App\Services\Donation;

use App\Models\Donation;
use App\Models\User;

final class DonationService
{
    public function findById(int $id): ?Donation
    {
        return Donation::find($id);
    }

    public function findByExternalReference(string $externalReference): ?Donation
    {
        return Donation::where('external_reference_id', $externalReference)->first();
    }

    public function findDonationsByUser(int $userId)
    {
        return Donation::where('user_id', $userId)
            ->with('campaign')
            ->latest()
            ->paginate();
    }

    private function queryPaidDonationsByCampaign(int $campaignId)
    {
        return Donation::where('campaign_id', $campaignId)
            ->where('payment_status', 'paid')
            ->with('user')
            ->latest('paid_at');
    }

    public function findRecentDonations(int $campaignId)
    {
        return $this->queryPaidDonationsByCampaign($campaignId)->take(15)->get();
    }

    public function listPaidDonationsByCampaign(int $campaignId)
    {
        return $this->queryPaidDonationsByCampaign($campaignId)->paginate();
    }

    public function create(array $attributes): Donation
    {
        return Donation::create($attributes);
    }

    public function createFromPayment(
        User $user,
        int $amount,
        string $paymentMethod,
        string $externalReference,
        ?int $campaignId = null,
        bool $isAnonymous = false
    ) {
        return $this->create([
            'user_id' => $isAnonymous ? null : $user->id,
            'is_anonymous' => $isAnonymous,
            'campaign_id' => $campaignId,
            'amount_cents' => $amount,
            'payment_method' => $paymentMethod,
            'payment_status' => 'pending',
            'payment_processor' => 'woovi',
            'external_reference' => $externalReference,
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

    public function thankDonor(Donation $donation, string $message): Donation
    {
        $donation->update([
            'thank_you_message' => $message,
            'thanked_at' => now(),
        ]);

        return $donation->fresh();
    }

    public function listThankableDonations(int $campaignId)
    {
        return Donation::where('campaign_id', $campaignId)
            ->where('payment_status', 'paid')
            ->where('is_anonymous', false)
            ->with('user')
            ->latest('paid_at')
            ->paginate();
    }

    public function isUserDonorForCampaign(?User $user, int $campaignId)
    {
        if (! $user) {
            return false;
        }

        return $user->donations()
            ->where('campaign_id', $campaignId)
            ->where('payment_status', 'paid')
            ->exists();
    }
}
