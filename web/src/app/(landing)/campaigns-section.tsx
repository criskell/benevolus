'use client';

import { useState } from 'react';
import { Spinner } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { CampaignCard } from '@/components/campaign/campaign-card';
import { useListCampaigns } from '@/lib/http/generated/hooks/useListCampaigns';
import type { Campaign } from '@/models/campaign';
import { CategoryNavigation } from './category-navigation';

const CATEGORIES = ['Saúde', 'Emergenciais', 'Educação', 'Animais'];
const MAX_VISIBLE_CAMPAIGNS = 6;

const calculateDaysRemaining = (expiresAt: string): number => {
  const diffMs = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
};

export const CampaignsSection = () => {
  const translations = useTranslations('home');
  const allCategoriesLabel = translations('all_categories');

  const { data: response, isLoading } = useListCampaigns({ status: 'open' });

  const campaigns: Campaign[] = (response?.data ?? []).map((campaign) => {
    const goal = campaign.goalCents ?? 0;
    const raised = campaign.amountRaisedCents ?? 0;
    const progress = goal > 0 ? Math.round((raised / goal) * 100) : 0;

    return {
      ...campaign,
      title: campaign.title ?? '',
      progress,
      raised,
      goal,
      daysRemaining: campaign.expiresAt
        ? calculateDaysRemaining(campaign.expiresAt)
        : undefined,
    };
  });

  const categories = [allCategoriesLabel, ...CATEGORIES];
  const [selectedCategory, setSelectedCategory] = useState(allCategoriesLabel);

  const filteredCampaigns = (
    selectedCategory === allCategoriesLabel
      ? campaigns
      : campaigns.filter((campaign) => campaign.category === selectedCategory)
  ).slice(0, MAX_VISIBLE_CAMPAIGNS);

  return (
    <>
      <div className="max-w-full">
        <CategoryNavigation
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Icon
            icon="solar:magnifer-outline"
            width={48}
            className="text-default-300 mb-4"
          />
          <p className="text-lg font-medium text-default-500">
            Nenhuma campanha encontrada nesta categoria.
          </p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard campaign={campaign} key={campaign.slug} />
          ))}
        </div>
      )}
    </>
  );
};
