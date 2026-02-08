'use client';

import { Input, Link } from '@heroui/react';
import { NumericFormat } from 'react-number-format';
import { useTranslations } from 'next-intl';

interface Step1BasicInfoProps {
  title: string;
  goalCents: number;
  onTitleChange: (value: string) => void;
  onGoalCentsChange: (value: number) => void;
}

export function Step1BasicInfo({
  title,
  goalCents,
  onTitleChange,
  onGoalCentsChange,
}: Step1BasicInfoProps) {
  const t = useTranslations('campaigns.create.step1');
  const handleGoalChange = (values: { floatValue?: number }) => {
    const value = values.floatValue || 0;
    // Converte reais para centavos
    onGoalCentsChange(Math.round(value * 100));
  };

  return (
    <div className="space-y-8">
      <div>
        <Input
          isRequired
          label={t('title_label')}
          placeholder={t('title_placeholder')}
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full"
          size="lg"
        />
      </div>

      <div>
        <NumericFormat
          customInput={Input}
          isRequired
          label={t('goal_label')}
          placeholder={t('goal_placeholder')}
          value={goalCents > 0 ? goalCents / 100 : undefined}
          onValueChange={handleGoalChange}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale
          prefix="R$ "
          allowNegative={false}
          className="w-full"
          size="lg"
        />
        <p className="text-sm text-default-500 mt-2">
          {t('goal_min')}
        </p>
      </div>

      <p className="text-sm text-default-500 text-center pt-4">
        {t('terms_text')}{' '}
        <Link href="/terms" className="text-primary">
          {t('terms_link')}
        </Link>
        .
      </p>
    </div>
  );
}

