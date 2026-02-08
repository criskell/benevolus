'use client';

import { RadioGroup, Radio, Select, SelectItem } from '@heroui/react';
import { useTranslations } from 'next-intl';

interface Step3CampaignDetailsProps {
  beneficiaryType: string;
  category: string;
  onBeneficiaryTypeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const beneficiaryValues = ['myself', 'pet', 'family', 'friend', 'company'];
const categoryKeys = ['animals', 'education', 'emergency', 'empathy', 'sports', 'income', 'housing', 'social', 'recurring', 'health'];

export function Step3CampaignDetails({
  beneficiaryType,
  category,
  onBeneficiaryTypeChange,
  onCategoryChange,
}: Step3CampaignDetailsProps) {
  const t = useTranslations('campaigns.create.step3');
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {t('beneficiary_title')} <span className="text-primary">{t('beneficiary_highlight')}</span>
        </h2>
        <RadioGroup
          value={beneficiaryType}
          onValueChange={onBeneficiaryTypeChange}
          className="space-y-3"
        >
          {beneficiaryValues.map((value) => (
            <Radio
              key={value}
              value={value}
              classNames={{
                base: 'max-w-full',
                wrapper: 'border-2 border-primary',
              }}
            >
              {t(`beneficiary_${value}`)}
            </Radio>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          {t('category_title')} <span className="text-primary">{t('category_highlight')}</span> {t('category_subtitle')}
        </h2>
        <Select
          label={t('category_label')}
          placeholder={t('category_placeholder')}
          selectedKeys={category ? [category] : []}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string;
            onCategoryChange(selected || '');
          }}
          className="w-full"
          size="lg"
        >
          {categoryKeys.map((key) => (
            <SelectItem key={t(`category_${key}`)}>
              {t(`category_${key}`)}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

