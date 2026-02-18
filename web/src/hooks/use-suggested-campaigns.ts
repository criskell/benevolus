import { campaigns } from '@/data/campaigns';
import type { Campaign } from '@/models/campaign';

export const useSuggestedCampaigns = () => {
  const getRelated = (category: string, currentSlug?: string, limit = 3): Campaign[] => {
    const related = campaigns.campaigns
      .filter(c => c.category === category && c.slug !== currentSlug)
      .slice(0, limit)
      .map(c => ({
        slug: c.slug,
        title: c.title,
        category: c.category,
        daysRemaining: c.daysRemaining,
        progress: c.progressPercent,
        currentAmount: Math.round(c.raised * 100),
        goalAmount: Math.round(c.goal * 100),
        image: c.image || '',
        images: [c.image || '', c.image || ''] as [string, string],
      }));

    return related;
  };

  const getByCategory = (category: string, limit = 5): Campaign[] => {
    return campaigns.campaigns
      .filter(c => c.category === category)
      .slice(0, limit)
      .map(c => ({
        slug: c.slug,
        title: c.title,
        category: c.category,
        daysRemaining: c.daysRemaining,
        progress: c.progressPercent,
        currentAmount: Math.round(c.raised * 100),
        goalAmount: Math.round(c.goal * 100),
        image: c.image || '',
        images: [c.image || '', c.image || ''] as [string, string],
      }));
  };

  return {
    getRelated,
    getByCategory,
  };
};