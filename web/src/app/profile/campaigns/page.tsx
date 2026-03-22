'use client';

import { useState } from 'react';
import { Button, Chip, Tabs, Tab, Spinner } from '@heroui/react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ProfileSidebar } from '../profile-sidebar';
import { MyCampaignCard } from './my-campaign-card';
import { useListCampaigns } from '@/lib/http/generated/hooks/useListCampaigns';
import { useGetProfile } from '@/lib/http/generated/hooks/useGetProfile';
import type { CampaignStatus, MyCampaign } from './types';

const MyCampaignsPage = () => {
  const t = useTranslations('campaigns.my_campaigns');
  const tStatus = useTranslations('campaigns.my_card');
  const [activeTab, setActiveTab] = useState<'all' | CampaignStatus>('all');
  const { data: profile } = useGetProfile();

  const { data: campaignsResponse, isLoading } = useListCampaigns(
    { userId: profile?.id, ...(activeTab !== 'all' ? { status: activeTab } : {}) },
    { query: { enabled: !!profile?.id } },
  );

  const campaigns = (campaignsResponse?.data ?? []) as MyCampaign[];

  const { data: allResponse } = useListCampaigns(
    { userId: profile?.id },
    { query: { enabled: !!profile?.id } },
  );
  const allCampaigns = (allResponse?.data ?? []) as MyCampaign[];

  const getCounts = () => {
    const counts = { all: allCampaigns.length, open: 0, in_review: 0, rejected: 0, finished: 0, closed: 0 };
    allCampaigns.forEach((c) => {
      if (c.status in counts) counts[c.status]++;
    });
    return counts;
  };

  const counts = getCounts();

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar />

        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold mb-2">{t('title')}</h1>
              <p className="text-sm text-default-500">
                {t('subtitle')}
              </p>
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
            onSelectionChange={(key) => setActiveTab(key as typeof activeTab)}
          >
            <Tab
              key="all"
              title={
                <div className="flex items-center gap-2">
                  {t('tab_all')}
                  <Chip size="sm" variant="flat">{counts.all}</Chip>
                </div>
              }
            />
            <Tab
              key="open"
              title={
                <div className="flex items-center gap-2">
                  {t('tab_open')}
                  <Chip size="sm" variant="flat" color="success">{counts.open}</Chip>
                </div>
              }
            />
            <Tab
              key="in_review"
              title={
                <div className="flex items-center gap-2">
                  {t('tab_in_review')}
                  <Chip size="sm" variant="flat" color="warning">{counts.in_review}</Chip>
                </div>
              }
            />
            <Tab
              key="finished"
              title={
                <div className="flex items-center gap-2">
                  {t('tab_finished')}
                  <Chip size="sm" variant="flat">{counts.finished}</Chip>
                </div>
              }
            />
          </Tabs>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : campaigns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-default-500 mb-4">
                {activeTab === 'all'
                  ? t('empty_all')
                  : t('empty_filtered', { status: tStatus(`status_${activeTab}`).toLowerCase() })}
              </p>
              {activeTab === 'all' && (
                <Button as={Link} href="/campaigns/create" color="primary">
                  {t('create_first')}
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaigns.map((campaign) => (
                <MyCampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyCampaignsPage;
