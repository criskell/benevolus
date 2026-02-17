'use client';

import { formatMoney } from '@/lib/utils/format-money';
import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';
import { Avatar, Badge, Button, Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

export const CampaignDonors = () => {
  const t = useTranslations('campaign.donors');
  const donations = [
    {
      donor: { name: 'Anônimo' },
      createdAt: 'há cerca de 1 hora',
      value: 1000,
      isAnonymous: true,
    },
    {
      donor: { name: 'Anônimo' },
      value: 5000,
      createdAt: 'há cerca de 1 hora',
      isAnonymous: true,
    },
    {
      donor: { name: 'Fulana' },
      value: 500,
      createdAt: 'há cerca de 2 horas',
      isAnonymous: false,
    },
    {
      donor: { name: 'Ciclano' },
      value: 600,
      createdAt: 'há cerca de 2 horas',
      isAnonymous: false,
    },
    {
      donor: { name: 'Silvano' },
      value: 700,
      createdAt: 'há cerca de 3 horas',
      isAnonymous: false,
    },
  ];

  return (
    <Card className="p-6 md:p-8 border border-default-200" shadow="none">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon icon="solar:users-group-rounded-bold" width={28} className="text-primary" />
          {t('title')}
        </h2>
        <Badge 
          content="427" 
          color="primary"
          size="lg"
          classNames={{
            badge: "font-bold text-sm"
          }}
        >
          <div className="w-1" />
        </Badge>
      </div>

      <div className="space-y-3">
        {donations.map((donation, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 rounded-2xl border border-default-200 hover:border-primary/30 transition-all duration-300 hover:shadow-md bg-default-50/50"
          >
            {/* Avatar */}
            <Avatar
              name={donation.donor.name}
              getInitials={getUserNameInitials}
              size="lg"
              classNames={{
                base: donation.isAnonymous 
                  ? "bg-default-200" 
                  : "bg-gradient-to-br from-primary to-primary-600",
                name: donation.isAnonymous ? "text-default-600" : "text-white font-semibold"
              }}
              icon={
                donation.isAnonymous ? (
                  <Icon icon="solar:user-bold" width={24} className="text-default-600" />
                ) : undefined
              }
            />

            {/* Donor Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-foreground truncate">{donation.donor.name}</p>
                {!donation.isAnonymous && (
                  <Icon icon="solar:verified-check-bold" width={16} className="text-primary flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-default-600">
                <Icon icon="solar:clock-circle-bold" width={14} />
                <span>{donation.createdAt}</span>
              </div>
            </div>

            {/* Amount */}
            <div className="text-right">
              <p className="text-lg font-bold text-emerald-600">
                {formatMoney(donation.value)}
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
}
