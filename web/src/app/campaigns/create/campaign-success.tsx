'use client';

import { Button, Card, CardBody, Chip } from '@heroui/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type CampaignSuccessProps = {
  campaignTitle: string;
  campaignGoal: number;
  campaignSlug?: string;
  campaignStatus?: string;
}

export const CampaignSuccess = ({
  campaignTitle,
  campaignGoal,
  campaignSlug,
  campaignStatus,
}: CampaignSuccessProps) => {
  const t = useTranslations('campaigns.create.step6');

  const statusLabel = campaignStatus === 'open'
    ? t('status_active')
    : t('status_in_review');

  const statusColor = campaignStatus === 'open' ? 'primary' : 'warning';

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">
          {t('title')}
        </h2>
        <p className="text-default-500 text-lg">
          {t('subtitle')}
        </p>
      </div>

      <div className="flex justify-center">
        <Card className="w-full max-w-sm shadow-lg">
          <CardBody className="p-6 space-y-4">
            <div className="bg-gradient-to-br from-primary to-primary/70 rounded-lg h-32 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white text-sm font-semibold">{t('card_tagline')}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold">{campaignTitle}</h3>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-default-500">{t('goal_label')}</p>
                <p className="text-lg font-semibold text-primary">
                  R$ {(campaignGoal / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <Chip color={statusColor} variant="flat" size="sm">
                {statusLabel}
              </Chip>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="space-y-4">
        {campaignSlug && (
          <Link href={`/${campaignSlug}`}>
            <Button
              fullWidth
              color="primary"
              size="lg"
              className="font-semibold"
            >
              {t('view_campaign')}
            </Button>
          </Link>
        )}
      </div>

      <div className="bg-default-50 rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-bold">{t('tips_title')}</h3>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="text-2xl">💙</div>
            <div>
              <h4 className="font-semibold mb-1">{t('tip_pix_title')}</h4>
              <p className="text-sm text-default-500">
                {t('tip_pix_description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
