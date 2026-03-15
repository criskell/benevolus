'use client';

import { Card } from '@heroui/card';
import { Chip, Avatar, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';
import placeholderImage1 from '@/assets/images/placeholder1.jpg';
import type { CampaignResource } from '@/lib/http/generated';

interface CampaignHeaderProps {
  campaign: CampaignResource;
}

const calculateDaysSince = (dateString?: string) => {
  if (!dateString) return 0;
  const diffMs = Date.now() - new Date(dateString).getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
};

export const CampaignHeader = ({ campaign }: CampaignHeaderProps) => {
  const t = useTranslations('campaign.header');
  const daysSince = calculateDaysSince(campaign.createdAt);

  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-8 border border-default-200" shadow="none">
        <div className="flex items-start gap-4 mb-6">
          <Avatar
            name={campaign.user?.name || 'Fulana'}
            getInitials={getUserNameInitials}
            className="flex-shrink-0 ring-2 ring-primary/20"
            size="lg"
            classNames={{
              base: 'bg-gradient-to-br from-primary to-primary-600',
              name: 'text-white font-semibold',
            }}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <p className="font-semibold text-foreground">
                {campaign.user?.name || 'Fulana Santos'}
              </p>
              <Icon
                icon="solar:verified-check-bold"
                width={20}
                className="text-primary flex-shrink-0"
              />
            </div>
            <p className="text-sm text-default-600">
              {t('created_ago', { days: daysSince })}
            </p>
          </div>

          <Button
            variant="bordered"
            size="sm"
            startContent={<Icon icon="solar:bookmark-bold" width={18} />}
            className="hidden md:flex border-default-300 hover:border-primary hover:text-primary transition-colors"
          >
            {t('follow_button')}
          </Button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
          {campaign.title}
        </h1>

        <div className="flex flex-wrap gap-2 mb-6">
          <Chip
            color="success"
            variant="flat"
            size="sm"
            startContent={<Icon icon="solar:shield-check-bold" width={16} />}
            classNames={{
              base: 'font-semibold',
            }}
          >
            {t('verified_badge')}
          </Chip>
          <Chip
            color="primary"
            variant="flat"
            size="sm"
            startContent={<Icon icon="solar:document-text-bold" width={16} />}
            classNames={{
              base: 'font-semibold',
            }}
          >
            {t('documents_badge')}
          </Chip>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-default-600">
          <div className="flex items-center gap-2">
            <Icon
              icon="solar:heart-bold"
              width={20}
              className="text-rose-500"
            />
            <span className="font-medium">
              {t('likes', { count: campaign.favoriteCount ?? 0 })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Icon
              icon="solar:users-group-rounded-bold"
              width={20}
              className="text-primary"
            />
            <span className="font-medium">
              {t('donors', { count: campaign.donationsCount ?? 0 })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Icon
              icon="solar:chat-round-dots-bold"
              width={20}
              className="text-amber-500"
            />
            <span className="font-medium">
              {t('comments', { count: campaign.comments?.length ?? 0 })}
            </span>
          </div>
        </div>

        <Button
          variant="bordered"
          size="md"
          fullWidth
          startContent={<Icon icon="solar:bookmark-bold" width={18} />}
          className="md:hidden mt-6 border-default-300 hover:border-primary hover:text-primary transition-colors"
        >
          {t('follow_campaign_button')}
        </Button>
      </Card>
    </div>
  );
};
