'use client';

import { Card, CardBody, Chip, Progress, Button } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import type { Campaign } from '@/models/campaign';
import { formatMoney } from '@/lib/utils/format-money';
import { FavoriteToggleButton } from '../donations/favorite-toggle-button';

export type CampaignCardProps = {
  campaign: Campaign;
};

export const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const t = useTranslations('campaigns.card');
  const router = useRouter();

  const handleDonate = () => {
    router.push(`/${campaign.slug}/donate`);
  };

  return (
    <Card className="group transition-all duration-300 shadow-none border border-default-200 hover:border-primary/15 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
      <CardBody className="p-0">
        <div className="relative w-full aspect-video overflow-hidden bg-default-100">
          {campaign.image ? (
            <>
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-default-300">
              <Icon icon="solar:gallery-bold" width={48} />
              <span className="text-xs text-default-400">{t('no_image')}</span>
            </div>
          )}

          <FavoriteToggleButton
            slug={campaign.slug || ''}
            title={campaign.title}
            image={campaign.image ?? ''}
          />

          {campaign.category && (
            <div className="absolute top-4 left-4">
              <Chip
                size="sm"
                variant="flat"
                className="bg-white/90 dark:bg-default-100/90 backdrop-blur-md font-semibold shadow-lg"
                startContent={<Icon icon="solar:tag-bold" width={16} />}
              >
                {campaign.category}
              </Chip>
            </div>
          )}
        </div>

        <div className="p-5">
          <Link href={`/${campaign.slug}`}>
            <h3 className="text-lg font-bold hover:text-primary cursor-pointer line-clamp-2 mb-3 transition-colors duration-200 leading-snug">
              {campaign.title}
            </h3>
          </Link>

          <div className="flex items-center justify-between mb-3">
            {campaign.daysRemaining != null ? (
              <div className="flex items-center gap-1.5 text-sm text-default-600">
                <Icon
                  icon="solar:clock-circle-bold"
                  width={18}
                  className="text-primary"
                />
                <span className="font-medium">
                  {campaign.daysRemaining} {t('days')}
                </span>
              </div>
            ) : (
              <div />
            )}
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black bg-gradient-to-br from-primary to-primary-600 bg-clip-text text-transparent">
                {campaign.progress}%
              </span>
            </div>
          </div>

          <Progress
            value={campaign.progress}
            className="mb-4"
            classNames={{
              indicator: 'bg-gradient-to-r from-primary to-primary-600',
            }}
            size="sm"
          />

          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs text-default-500 mb-1">
                {t('raised_label')}
              </p>
              <p className="text-lg font-bold text-foreground">
                {formatMoney(campaign.raised)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-default-500 mb-1">{t('goal_label')}</p>
              <p className="text-sm font-semibold text-default-700">
                {formatMoney(campaign.goal)}
              </p>
            </div>
          </div>

          <Button
            color="primary"
            className="w-full font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 group-hover:scale-[1.02]"
            onPress={handleDonate}
            startContent={<Icon icon="solar:heart-bold" width={20} />}
            size="lg"
          >
            {t('donate_button')}
          </Button>
        </div>

        <div className="h-1 bg-default-100 group-hover:bg-primary transition-colors duration-300" />
      </CardBody>
    </Card>
  );
};
