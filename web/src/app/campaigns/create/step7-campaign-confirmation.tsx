'use client';

import { Button, Card, CardBody, Chip } from '@heroui/react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Step7CampaignConfirmationProps = {
  campaignTitle: string;
  campaignId?: string;
}

export const Step7CampaignConfirmation = ({
  campaignTitle,
  campaignId = '5857894',
}: Step7CampaignConfirmationProps) => {
  const t = useTranslations('campaigns.create.step7');
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">{t('title')}</h2>
        <p className="text-default-500 text-lg">
          {t('subtitle')}{' '}
          <span className="font-semibold text-foreground">{t('subtitle_bold')}</span>
        </p>
      </div>

      <Card className="shadow-lg">
        <CardBody className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-default-500">Data: 21/12/2025</p>
            </div>
            <Chip color="success" variant="flat" className="text-foreground">
              {t('status_active')}
            </Chip>
          </div>

          <div className="flex gap-4">
            <div className="bg-gradient-to-br from-primary to-primary/70 rounded-lg w-24 h-24 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold">{campaignTitle}</h3>
              <p className="text-sm text-default-500">ID {campaignId}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button fullWidth color="primary" size="lg" className="font-semibold">
              {t('edit_campaign')}
            </Button>
            <Button
              fullWidth
              variant="bordered"
              color="primary"
              size="lg"
              className="font-semibold"
            >
              {t('share_campaign')}
            </Button>
          </div>
        </CardBody>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">{t('create_new_title')}</h3>
        <Button
          fullWidth
          variant="bordered"
          color="default"
          size="lg"
          className="font-semibold"
        >
          {t('create_new_button')}
        </Button>
      </div>

      <div className="pt-4 border-t border-divider">
        <Link href="/campaigns">
          <Button fullWidth variant="light" size="lg">
            {t('back_to_campaigns')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
