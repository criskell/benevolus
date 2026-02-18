import { campaigns } from '@/data/campaigns';

type CampaignData = (typeof campaigns.campaigns)[number];

type DistributionItem = {
  slug: string;
  amount: number;
};

const MAIN_SHARE = 0.8;

function getTargetCampaigns(
  campaign: CampaignData,
  distributionType: 'category' | 'favorites',
  likedSlugs: string[]
) {
  if (distributionType === 'category') {
    return campaigns.campaigns.filter((c) => c.category === campaign.category);
  }
  return campaigns.campaigns.filter((c) => likedSlugs.includes(c.slug));
}

function splitEqual(slugs: string[], totalCents: number): DistributionItem[] {
  const each = Math.floor(totalCents / slugs.length);
  return slugs.map((slug) => ({ slug, amount: each }));
}

function splitMixed(
  mainSlug: string,
  otherSlugs: string[],
  totalCents: number
): DistributionItem[] {
  const mainAmount = Math.floor(totalCents * MAIN_SHARE);
  const remaining = Math.floor(totalCents * (1 - MAIN_SHARE));
  const each = otherSlugs.length > 0 ? Math.floor(remaining / otherSlugs.length) : 0;

  return [
    { slug: mainSlug, amount: mainAmount },
    ...otherSlugs.map((slug) => ({ slug, amount: each })),
  ];
}

export function calculateDistribution(
  campaign: CampaignData,
  criteria: 'equal' | 'mixed' | 'integral',
  distributionType: 'category' | 'favorites',
  totalAmount: number,
  likedSlugs: string[]
): DistributionItem[] {
  const totalCents = totalAmount * 100;

  if (criteria === 'integral') {
    return [{ slug: campaign.slug, amount: totalCents }];
  }

  const targets = getTargetCampaigns(campaign, distributionType, likedSlugs);
  if (targets.length === 0) return [];

  const slugs = targets.map((c) => c.slug);

  if (criteria === 'equal') {
    return splitEqual(slugs, totalCents);
  }

  const otherSlugs = slugs.filter((s) => s !== campaign.slug);
  return splitMixed(campaign.slug, otherSlugs, totalCents);
}
