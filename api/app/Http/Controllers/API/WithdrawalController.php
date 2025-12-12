<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWithdrawalRequest;
use App\Http\Resources\WithdrawalResource;
use App\Models\Campaign;
use App\Models\Withdrawal;
use App\Services\WithdrawalProcessor;
use App\Services\WithdrawalService;

class WithdrawalController extends Controller
{
    public function __construct(
        private WithdrawalService $withdrawalService,
        private WithdrawalProcessor $withdrawalProcessor
    ) {}

    public function index()
    {
        $withdrawals = $this->withdrawalService->list();

        return WithdrawalResource::collection($withdrawals);
    }

    public function store(Campaign $campaign, StoreWithdrawalRequest $request)
    {
        $data = [
            'pix_key_type' => $request->pixKeyType,
            'pix_key' => $request->pixKey,
            'amountCents' => $request->amountCents,
        ];

        // FIXME: Validate campaign account balance.
        $withdrawal = $this->withdrawalService->create($campaign, $data);

        // FIXME: Background processing.
        $this->withdrawalProcessor->process($withdrawal);

        return response()->noContent();
    }

    public function show(Withdrawal $withdrawal)
    {
        return new WithdrawalResource($withdrawal->load('campaign'));
    }
}
