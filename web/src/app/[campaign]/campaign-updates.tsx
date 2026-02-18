'use client';

import { Badge, Card } from '@heroui/react';
import { useTranslations } from 'next-intl';

export const CampaignUpdates = () => {
  const t = useTranslations('campaign.updates');
  
  return (
    <Card className="p-12 border border-divider" shadow="none">
      <div className="text-lg font-semibold mb-6 flex items-center gap-4">
        {t('title')}
        <Badge content="0"> </Badge>
      </div>

      <p className="text-center text-zinc-500">
        {t('empty_message')} <br /> {t('empty_message_line2')}
      </p>
    </Card>
  );
}
