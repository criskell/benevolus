<?php

namespace App\Services\Withdrawal;

use App\Models\Campaign;
use App\Models\Withdrawal;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

final class WithdrawalService
{
    public function list(): LengthAwarePaginator
    {
        return Withdrawal::with('campaign')->paginate();
    }

    public function create(Campaign $campaign, array $data): Withdrawal
    {
        return $campaign->withdrawals()->create($data);
    }

    public function find(Withdrawal $withdrawal): Withdrawal
    {
        return $withdrawal->load('campaign');
    }

    public function update(Withdrawal $withdrawal, array $data): Withdrawal
    {
        $withdrawal->update($data);
        return $withdrawal->load('campaign');
    }

    public function delete(Withdrawal $withdrawal): void
    {
        $withdrawal->delete();
    }
}
