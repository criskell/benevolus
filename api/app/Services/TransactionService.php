<?php

namespace App\Services;

use App\Models\Donation;
use App\Models\Transaction;
use App\Models\User;

class TransactionService
{
    public function create(array $attributes): Transaction
    {
        return Transaction::create($attributes);
    }

    public function createFromDonation(Donation $donation, User $user)
    {
        return $this->create([
            'campaign_id' => $donation->campaign_id,
            'user_id' => $user->id,
            'direction' => 'in',
            'type' => 'donation',
        ]);
    }

    public function createWithdrawal(int $campaignId, int $userId, int $amount): Transaction
    {
        return $this->create([
            'campaign_id' => $campaignId,
            'user_id' => $userId,
            'direction' => 'in',
            'type' => 'withdrawal',
        ]);
    }

    public function getTransactionsByCampaign(int $campaignId, int $perPage = 15)
    {
        return Transaction::where('campaign_id', $campaignId)
            ->with('user')
            ->latest()
            ->paginate($perPage);
    }

    public function getTransactionsByUser(int $userId, int $perPage = 15)
    {
        return Transaction::where('user_id', $userId)
            ->with('campaign')
            ->latest()
            ->paginate($perPage);
    }
}
