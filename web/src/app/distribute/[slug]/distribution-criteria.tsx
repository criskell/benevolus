'use client';

import { RadioGroup, Radio } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { formatMoney } from '@/lib/utils/format-money';
import { campaigns } from '@/data/campaigns';

type CampaignMap = Record<string, (typeof campaigns.campaigns)[number]>;

type DistributionItem = {
  slug: string;
  amount: number;
};

type DistributionCriteriaProps = {
  criteria: 'equal' | 'mixed' | 'integral';
  onCriteriaChange: (value: 'equal' | 'mixed' | 'integral') => void;
  distribution: DistributionItem[];
  campaignMap: CampaignMap;
  totalAmount: number;
  description: string;
};

const DistributionCriteria = ({
  criteria,
  onCriteriaChange,
  distribution,
  campaignMap,
  totalAmount,
  description,
}: DistributionCriteriaProps) => {
  const t = useTranslations('campaigns.distribute');

  return (
    <div className="mt-6">
      <p className="text-sm text-default-600 mb-4">{description}</p>
      <RadioGroup
        value={criteria}
        onValueChange={(value) =>
          onCriteriaChange(value as 'equal' | 'mixed' | 'integral')
        }
        classNames={{
          wrapper: 'gap-3',
        }}
      >
        <Radio value="equal" classNames={{ label: 'text-sm' }}>
          <div>
            <p className="font-semibold">
              {t('smart_distribution.criteria_equal_title')}
            </p>
            <p className="text-xs text-default-500">
              {t('smart_distribution.criteria_equal_description')}
            </p>
          </div>
        </Radio>
        <Radio value="mixed" classNames={{ label: 'text-sm' }}>
          <div>
            <p className="font-semibold">
              {t('smart_distribution.criteria_mixed_title')}
            </p>
            <p className="text-xs text-default-500">
              {t('smart_distribution.criteria_mixed_description')}
            </p>
          </div>
        </Radio>
        <Radio value="integral" classNames={{ label: 'text-sm' }}>
          <div>
            <p className="font-semibold">
              {t('smart_distribution.criteria_integral_title')}
            </p>
            <p className="text-xs text-default-500">
              {t('smart_distribution.criteria_integral_description')}
            </p>
          </div>
        </Radio>
      </RadioGroup>

      {distribution.length > 0 && (
        <div className="mt-6 p-4 bg-default-50 border border-default-200 rounded-2xl">
          <h5 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Icon
              icon="solar:pie-chart-2-bold"
              width={20}
              className="text-primary"
            />
            {t('smart_distribution.preview_title')}
          </h5>
          <div className="space-y-2">
            {distribution.map((item) => {
              const camp = campaignMap[item.slug];
              const percentage = (
                (item.amount / (totalAmount * 100)) *
                100
              ).toFixed(0);
              return (
                <div
                  key={item.slug}
                  className="flex items-center justify-between p-3 bg-white border border-default-200 rounded-xl"
                >
                  <div className="flex-1 min-w-0 mr-3">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {camp?.title}
                    </p>
                    <p className="text-xs text-default-500">
                      {t('smart_distribution.preview_percentage', { percentage })}
                    </p>
                  </div>
                  <span className="text-base font-bold text-primary whitespace-nowrap">
                    {formatMoney(item.amount)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DistributionCriteria;
