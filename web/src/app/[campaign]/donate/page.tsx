'use client';

import {
  Breadcrumbs,
  BreadcrumbItem,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

import { CampaignAside } from './campaign-aside';
import { DonateForm } from './donate-form';

const CampaignDonatePage = () => {
  const t = useTranslations('donate');
  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-8">
          <BreadcrumbItem 
            startContent={<Icon icon="solar:home-2-bold" width={18} />}
          >
            {t('breadcrumb_home')}
          </BreadcrumbItem>
          <BreadcrumbItem>{t('breadcrumb_campaign')}</BreadcrumbItem>
          <BreadcrumbItem>{t('breadcrumb_donate')}</BreadcrumbItem>
        </Breadcrumbs>

        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-lg shadow-primary/25">
              <Icon icon="solar:heart-bold" width={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-foreground">
                {t('page_title')}
              </h1>
              <p className="text-default-600 text-sm md:text-base mt-1">
                {t('page_subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <DonateForm />
          <CampaignAside />
        </div>
      </div>
    </div>
  );
};

export default CampaignDonatePage;
