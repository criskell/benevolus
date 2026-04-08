'use client';

import { Button, Card, Progress } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { formatMoney } from '@/lib/utils/format-money';
import type { CampaignResource } from '@/lib/http/generated';
import Link from 'next/link';

interface CampaignSidebarProps {
  campaign: CampaignResource;
}

const calculateDaysRemaining = (expiresAt?: string | null) => {
  if (!expiresAt) return 0;
  const diffMs = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
};

export const CampaignSidebar = ({ campaign }: CampaignSidebarProps) => {
  const t = useTranslations('campaign.sidebar');

  const raised = (campaign.amountRaisedCents ?? 0) / 100;
  const goal = (campaign.goalCents ?? 0) / 100;
  const progress =
    goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0;
  const daysRemaining = calculateDaysRemaining(campaign.expiresAt);

  return (
    <div className="space-y-6">
      {/* Main Donation Card */}
      <Card
        className="p-6 border border-default-200 overflow-hidden relative"
        shadow="none"
      >
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -z-10" />

        <div className="space-y-6">
          {/* Amount Section */}
          <div className="text-center">
            <p className="text-sm text-default-600 mb-2 font-medium">
              {t('raised_label')}
            </p>
            <p className="text-4xl font-black bg-gradient-to-br from-primary to-primary-600 bg-clip-text text-transparent mb-1">
              {formatMoney(raised)}
            </p>
            <p className="text-sm text-default-600 font-medium">
              {t('of')}{' '}
              <span className="text-foreground font-semibold">
                {formatMoney(goal)}
              </span>
            </p>
          </div>

          {/* Progress Bar */}
          <div>
            <Progress
              value={progress}
              size="md"
              classNames={{
                indicator: 'bg-gradient-to-r from-primary to-primary-600',
                track: 'bg-default-200',
              }}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-default-600 font-medium">
                {t('completed_percent', { percent: progress })}
              </span>
              <span className="text-xs font-bold text-primary">
                {t('remaining_percent', { percent: 100 - progress })}
              </span>
            </div>
          </div>

          {/* Campaign Stats */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-default-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">
                {campaign.donationsCount ?? 0}
              </p>
              <p className="text-xs text-default-600 font-medium mt-1">
                {t('donors_label')}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">
                {daysRemaining}
              </p>
              <p className="text-xs text-default-600 font-medium mt-1">
                {t('days_remaining')}
              </p>
            </div>
          </div>

          {/* Donate Button */}
          <Button
            className="w-full font-bold text-base shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
            color="primary"
            size="lg"
            startContent={<Icon icon="solar:heart-bold" width={24}/>}
            as={Link}
            href={`/${campaign.slug}/donate`}
          > 
            {t('donate_button')}
          </Button>

          {/* Security Badge */}
          <div className="flex items-center gap-2 text-xs text-default-600 bg-default-50 p-3 rounded-xl">
            <Icon
              icon="solar:shield-check-bold"
              width={20}
              className="text-primary flex-shrink-0"
            />
            <span className="font-medium">{t('secure_payment')}</span>
          </div>
        </div>
      </Card>
      {/* Trust Indicators */}
      <Card className="p-6 border border-default-200" shadow="none">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Icon
            icon="solar:shield-star-bold"
            width={24}
            className="text-primary"
          />
          {t('trust_title')}
        </h3>

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
              <Icon
                icon="solar:shield-check-bold"
                width={24}
                className="text-white"
              />
            </div>

            <div>
              <p className="font-semibold text-sm mb-1">
                {t('trust_identity_title')}
              </p>
              <p className="text-xs text-default-600 leading-relaxed">
                {t('trust_identity_description')}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
              <Icon
                icon="solar:chart-2-bold"
                width={24}
                className="text-white"
              />
            </div>

            <div>
              <p className="font-semibold text-sm mb-1">
                {t('trust_transparency_title')}
              </p>
              <p className="text-xs text-default-600 leading-relaxed">
                {t('trust_transparency_description')}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Icon
                icon="solar:lock-keyhole-bold"
                width={24}
                className="text-white"
              />
            </div>

            <div>
              <p className="font-semibold text-sm mb-1">
                {t('trust_security_title')}
              </p>
              <p className="text-xs text-default-600 leading-relaxed">
                {t('trust_security_description')}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Share Card */}
      <Card className="p-6 border border-default-200" shadow="none">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Icon icon="solar:share-bold" width={24} className="text-primary" />
          {t('share_title')}
        </h3>
        <p className="text-sm text-default-600 mb-4">
          {t('share_description')}
        </p>

        <div className="flex gap-2">
          <Button
            isIconOnly
            variant="flat"
            className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 transition-colors"
            size="lg"
          >
            <Icon icon="ri:facebook-fill" width={24} />
          </Button>
          <Button
            isIconOnly
            variant="flat"
            className="bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 transition-colors"
            size="lg"
          >
            <Icon icon="ri:twitter-x-fill" width={24} />
          </Button>
          <Button
            isIconOnly
            variant="flat"
            className="bg-green-500/10 hover:bg-green-500/20 text-green-600 transition-colors"
            size="lg"
          >
            <Icon icon="ri:whatsapp-fill" width={24} />
          </Button>
          <Button
            isIconOnly
            variant="flat"
            className="bg-default-100 hover:bg-default-200 text-default-600 transition-colors"
            size="lg"
          >
            <Icon icon="solar:link-bold" width={24} />
          </Button>
        </div>
      </Card>
    </div>
  );
};
