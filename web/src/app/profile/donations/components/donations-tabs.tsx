'use client';

import { Button } from '@heroui/react';

type DonationsTabsProps = {
  activeTab: 'one-time' | 'monthly';
  onTabChange: (tab: 'one-time' | 'monthly') => void;
};

export const DonationsTabs = ({
  activeTab,
  onTabChange,
}: DonationsTabsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="light"
        radius="none"
        className={`px-4 py-2 rounded-none border-b-2 transition-colors ${
          activeTab === 'one-time'
            ? 'border-primary text-primary font-medium'
            : 'border-transparent text-default-500 hover:text-default-700'
        }`}
        onPress={() => onTabChange('one-time')}
      >
        Avulsa
      </Button>
      <Button
        variant="light"
        radius="none"
        className={`px-4 py-2 rounded-none border-b-2 transition-colors ${
          activeTab === 'monthly'
            ? 'border-primary text-primary font-medium'
            : 'border-transparent text-default-500 hover:text-default-700'
        }`}
        onPress={() => onTabChange('monthly')}
      >
        Doação mensal
      </Button>
    </div>
  );
};
