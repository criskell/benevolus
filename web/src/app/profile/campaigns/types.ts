export type CampaignStatus = 'open' | 'in_review' | 'closed' | 'rejected' | 'finished';

export type MyCampaign = {
  id: number;
  slug: string;
  title: string;
  description: string;
  goalCents: number;
  amountRaisedCents: number;
  donationsCount: number;
  image: string | null;
  status: CampaignStatus;
  createdAt: string;
  updatedAt: string;
};
