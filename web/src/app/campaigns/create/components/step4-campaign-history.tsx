'use client';

import { Textarea } from '@heroui/react';
import { useTranslations } from 'next-intl';

type Step4CampaignHistoryProps = {
  history: string;
  onHistoryChange: (value: string) => void;
}

export const Step4CampaignHistory = ({
  history,
  onHistoryChange,
}: Step4CampaignHistoryProps) => {
  const t = useTranslations('campaigns.create.step4');
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">
          {t('title')} <span className="text-primary">{t('title_highlight')}</span>
        </h2>
        <p className="text-default-500">
          {t('subtitle')}
        </p>
      </div>

      <div>
        <Textarea
          label={t('label')}
          placeholder={t('placeholder')}
          value={history}
          onValueChange={onHistoryChange}
          minRows={8}
          isRequired
          classNames={{
            label: 'text-sm font-medium',
          }}
        />
      </div>
    </div>
  );
}
