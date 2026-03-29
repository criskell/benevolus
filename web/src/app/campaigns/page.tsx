import { listCampaigns } from '@/lib/http/generated/listCampaigns';

import { CampaignsView } from './campaigns-view';

const calculateDaysRemaining = (expiresAt: string) => {
  const diffMs = new Date(expiresAt).getTime() - Date.now();

  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
};

const CampaignsPage = async ({ searchParams }: PageProps<'/campaigns'>) => {
  const params = await searchParams;

  const response = await listCampaigns({
    search: params.search ? String(params.search) : undefined,
  });

  const data = response.data ?? [];

  const campaigns = data.map((campaign) => {
    const goal = campaign.goalCents ?? 0;
    const raised = campaign.amountRaisedCents ?? 0;
    const progress = goal > 0 ? Math.round((raised / goal) * 100) : 0;

    return {
      ...campaign,
      title: campaign.title ?? '',
      progress,
      raised,
      goal,
      images: campaign.image ? [campaign.image] : [],
      daysRemaining: campaign.expiresAt
        ? calculateDaysRemaining(campaign.expiresAt)
        : undefined,
    };
  });

  return <CampaignsView initialCampaigns={campaigns} />;
};

export default CampaignsPage;
