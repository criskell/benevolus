'use client';

import { Spinner } from '@heroui/react';
import { BookmarkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ProfileSidebar } from '../profile-sidebar';
import { CampaignCard } from '@/components/campaign/campaign-card';
import { useListFavoritedCampaigns } from '@/lib/http/generated';
import type { Campaign } from '@/models/campaign';

const calculateDaysRemaining = (expiresAt?: string | null) => {
  if (!expiresAt) return undefined;
  const diffMs = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
};

const FollowedCampaignsPage = () => {
  const t = useTranslations('followed_campaigns');
  const { data: favoritedCampaigns, isLoading } = useListFavoritedCampaigns();

  const campaigns: Campaign[] = (favoritedCampaigns ?? []).map((campaign) => {
    const goal = campaign.goalCents ?? 0;
    const raised = campaign.amountRaisedCents ?? 0;
    const progress = goal > 0 ? Math.round((raised / goal) * 100) : 0;

    return {
      ...campaign,
      title: campaign.title ?? '',
      progress,
      raised,
      goal,
      daysRemaining: calculateDaysRemaining(campaign.expiresAt),
    };
  });

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar />

        <main className="flex-1 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">{t('title')}</h1>
            <p className="text-sm text-default-500">
              {t('subtitle')}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Spinner size="lg" />
            </div>
          ) : campaigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <BookmarkIcon size={48} className="text-default-300 mb-4" />
              <p className="text-lg font-medium text-default-600">
                {t('empty_title')}
              </p>
              <p className="text-sm text-default-400 mt-1">
                {t('empty_subtitle')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaigns.map((campaign) => (
                <CampaignCard key={campaign.slug} campaign={campaign} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FollowedCampaignsPage;
