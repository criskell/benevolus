'use client';

import { Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

interface CampaignStoryProps {
  description: string;
}

export const CampaignStory = ({ description }: CampaignStoryProps) => {
  const t = useTranslations('campaign.story');

  return (
    <Card className="p-6 md:p-8 border border-default-200" shadow="none">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-6">
        <Icon
          icon="solar:document-text-bold"
          width={28}
          className="text-primary"
        />
        {t('title')}
      </h2>

      <div className="prose prose-default max-w-none">
        <div className="space-y-4 text-default-700 leading-relaxed">
          <div
            className="text-base md:text-lg whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </Card>
  );
};
