'use client';

import { formatMoney } from '@/lib/utils/format-money';
import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';
import { Avatar, Badge, Button, Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import type { CampaignDonationResource } from '@/lib/http/generated';

interface CampaignDonorsProps {
  donations: CampaignDonationResource[];
  donorsCount: number;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

export const CampaignDonors = ({
  donations: campaignDonations,
  donorsCount,
}: CampaignDonorsProps) => {
  const t = useTranslations('campaign.donors');

  return (
    <Card className="p-6 md:p-8 border border-default-200" shadow="none">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon
            icon="solar:users-group-rounded-bold"
            width={28}
            className="text-primary"
          />
          {t('title')}
        </h2>
        <Badge
          content={donorsCount}
          color="primary"
          size="lg"
          classNames={{
            badge: 'font-bold text-sm',
          }}
        >
          <div className="w-1" />
        </Badge>
      </div>

      <div className="space-y-3">
        {campaignDonations.map((donation, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 rounded-2xl border border-default-200 hover:border-primary/30 transition-all duration-300 hover:shadow-md bg-default-50/50"
          >
            {/* Avatar */}
            <Avatar
              name={donation.donor_name || 'Anônimo'}
              getInitials={getUserNameInitials}
              size="lg"
              classNames={{
                base: !donation.donor_name
                  ? 'bg-default-200'
                  : 'bg-gradient-to-br from-primary to-primary-600',
                name: !donation.donor_name
                  ? 'text-default-600'
                  : 'text-white font-semibold',
              }}
              icon={
                !donation.donor_name ? (
                  <Icon
                    icon="solar:user-bold"
                    width={24}
                    className="text-default-600"
                  />
                ) : undefined
              }
            />

            {/* Donor Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-foreground truncate">
                  {donation.donor_name || 'Anônimo'}
                </p>
                {donation.donor_name && (
                  <Icon
                    icon="solar:verified-check-bold"
                    width={16}
                    className="text-primary flex-shrink-0"
                  />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-default-600">
                <Icon icon="solar:clock-circle-bold" width={14} />
                <span>{formatDate(donation.created_at)}</span>
              </div>
            </div>

            {/* Amount */}
            <div className="text-right">
              <p className="text-lg font-bold text-emerald-600">
                {formatMoney((donation.amount_cents ?? 0) / 100)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="flat"
        className="w-full mt-6 font-semibold"
        size="lg"
        endContent={<Icon icon="solar:arrow-down-bold" width={20} />}
      >
        {t('view_all_button')}
      </Button>
    </Card>
  );
};
