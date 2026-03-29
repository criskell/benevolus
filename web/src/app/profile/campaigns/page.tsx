'use client';

import { useMemo, useState } from 'react';
import { Button, Chip, Tabs, Tab, Spinner } from '@heroui/react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useListCampaigns } from '@/lib/http/generated/hooks/useListCampaigns';
import { useGetProfile } from '@/lib/http/generated/hooks/useGetProfile';

import { ProfileSidebar } from '../profile-sidebar';
import { MyCampaignCard } from './my-campaign-card';
import type { CampaignStatus } from './types';

type TabKey = 'all' | CampaignStatus;

const TABS = [
  { key: 'all', labelKey: 'tab_all', color: 'default' },
  { key: 'open', labelKey: 'tab_open', color: 'success' },
  { key: 'in_review', labelKey: 'tab_in_review', color: 'warning' },
  { key: 'finished', labelKey: 'tab_finished', color: 'default' },
] as const;

const MyCampaignsPage = () => {
  const t = useTranslations('campaigns.my_campaigns');
  const translateStatus = useTranslations('campaigns.my_card');
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const { data: profile } = useGetProfile();
  const queryOptions = { query: { enabled: !!profile?.id } };

  const { data: campaignsResponse } = useListCampaigns(
    { userId: profile?.id },
    queryOptions,
  );

  const { data: filteredResponse, isLoading } = useListCampaigns(
    {
      userId: profile?.id,
      ...(activeTab !== 'all' ? { status: activeTab } : {}),
    },
    queryOptions,
  );

  const allCampaigns = campaignsResponse?.data ?? [];
  const filteredCampaigns = filteredResponse?.data ?? [];

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: allCampaigns.length };

    allCampaigns.forEach((campaign) => {
      if (!campaign.status) {
        return;
      }

      result[campaign.status] = (result[campaign.status] ?? 0) + 1;
    });

    return result;
  }, [allCampaigns]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      );
    }

    if (filteredCampaigns.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-default-500 mb-4">
            {activeTab === 'all'
              ? t('empty_all')
              : t('empty_filtered', {
                  status: translateStatus(`status_${activeTab}`).toLowerCase(),
                })}
          </p>

          {activeTab === 'all' && (
            <Button as={Link} href="/campaigns/create" color="primary">
              {t('create_first')}
            </Button>
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCampaigns.map((campaign) => (
          <MyCampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar />

        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold mb-2">{t('title')}</h1>
              <p className="text-sm text-default-500">{t('subtitle')}</p>
            </div>
            <Button
              as={Link}
              href="/campaigns/create"
              color="primary"
              startContent={<Plus size={18} />}
            >
              {t('new_campaign')}
            </Button>
          </div>

          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as TabKey)}
          >
            {TABS.map(({ key, labelKey, color }) => (
              <Tab
                key={key}
                title={
                  <div className="flex items-center gap-2">
                    {t(labelKey)}
                    <Chip size="sm" variant="flat" color={color}>
                      {counts[key] ?? 0}
                    </Chip>
                  </div>
                }
              />
            ))}
          </Tabs>

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default MyCampaignsPage;
