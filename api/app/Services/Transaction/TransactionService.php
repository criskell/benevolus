<?php

declare(strict_types=1);

namespace App\Services\Transaction;

use App\Models\Donation;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\DB;

final class TransactionService
{
    public function create(array $attributes): Transaction
    {
        return Transaction::create($attributes);
    }

    public function createFromDonation(Donation $donation, ?User $user = null)
    {
        return $this->create([
            'campaign_id' => $donation->campaign_id,
            'user_id' => $user?->id ?? $donation->user_id,
            'type' => 'donation',
            'amount_cents' => $donation->amount_cents,
        ]);
    }

    public function createWithdrawal(int $campaignId, int $userId, int $amount): Transaction
    {
        return $this->create([
            'campaign_id' => $campaignId,
            'user_id' => $userId,
            'type' => 'withdrawal',
            'amount_cents' => -$amount,
        ]);
    }

    public function getTransactionsByCampaign(int $campaignId, int $perPage = 15)
    {
        return Transaction::where('campaign_id', $campaignId)
            ->with('user')
            ->latest()
            ->paginate($perPage);
    }

    public function getFilteredTransactionsByCampaign(
        int $campaignId,
        ?string $type = null,
        ?int $periodDays = null,
        int $perPage = 15
    ) {
        $query = Transaction::where('campaign_id', $campaignId)
            ->with('user')
            ->latest();

        if ($type !== null && in_array($type, ['donation', 'withdrawal', 'dispute', 'adjustment'])) {
            $query->where('type', $type);
        }

        if ($periodDays !== null) {
            $query->where('created_at', '>=', now()->subDays($periodDays));
        }

        return $query->paginate($perPage);
    }

    public function getCampaignSummary(int $campaignId): array
    {
        $result = Transaction::where('campaign_id', $campaignId)
            ->selectRaw('COALESCE(SUM(amount_cents), 0) as balance')
            ->selectRaw('COALESCE(SUM(CASE WHEN amount_cents > 0 THEN amount_cents ELSE 0 END), 0) as total_received')
            ->selectRaw('COALESCE(ABS(SUM(CASE WHEN amount_cents < 0 THEN amount_cents ELSE 0 END)), 0) as total_withdrawn')
            ->first();

        return [
            'balance' => (int) $result->balance,
            'total_received' => (int) $result->total_received,
            'total_withdrawn' => (int) $result->total_withdrawn,
        ];
    }

    public function getTransactionsByUser(int $userId, int $perPage = 15)
    {
        return Transaction::where('user_id', $userId)
            ->with('campaign')
            ->latest()
            ->paginate($perPage);
    }
}
