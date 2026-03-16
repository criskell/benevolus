'use client';

import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const EmptyState = () => {
  const t = useTranslations('campaigns.list');

  return (
    <div className="text-center py-12">
      <Icon
        icon="solar:magnifer-outline"
        width={48}
        className="text-default-300 mb-4 mx-auto"
      />
      <h3 className="text-xl font-semibold mb-2">
        {t('empty_title')}
      </h3>
      <p className="text-gray-500 mb-4">
        {t('empty_description')}
      </p>
      <Button as={Link} href="/campaigns" color="primary">
        {t('empty_explore')}
      </Button>
    </div>
  );
};
