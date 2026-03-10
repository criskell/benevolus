export type CampaignStatus = 'in_review' | 'open' | 'closed' | 'rejected' | 'finished';

export type ICampaign = {
  id: number;
  title: string;
  description: string;
  goalCents: number;
  amountRaisedCents: number;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  status: CampaignStatus;
  favoriteCount: number;
}
