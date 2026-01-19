<?php

namespace App\Services\Campaign;

use App\Models\CampaignUpdate;
use App\Models\User;
use App\Services\Donation\DonationService;

final class CampaignUpdateService
{
    public function __construct(private DonationService $donationService) {}

    public function listByCampaign(int $campaignId, ?User $user)
    {
        $query = CampaignUpdate::where('campaign_id', $campaignId);
        $isUserDonor = $this->donationService->isUserDonorForCampaign($user, $campaignId);

        if (!$isUserDonor) {
            $query->where('visible_to_donors_only', false);
        }

        return $query->paginate();
    }

    public function findById(int $id, ?User $user): ?CampaignUpdate
    {
        $update = CampaignUpdate::find($id);

        if (!$update) {
            return null;
        }

        if (!$update->visible_to_donors_only) {
            return $update;
        }

        $isUserDonor = $this->donationService->isUserDonorForCampaign($user, $update->campaign_id);

        if (!$isUserDonor) {
            return null;
        }

        return $update;
    }

    public function create(int $campaignId, array $data): CampaignUpdate
    {
        return CampaignUpdate::create([
            'campaign_id' => $campaignId,
            'title' => $data['title'],
            'content' => $data['content'],
            'visible_to_donors_only' => $data['visibleToDonorsOnly'],
        ]);
    }

    public function delete(CampaignUpdate $campaignUpdate): void
    {
        $campaignUpdate->delete();
    }
}
