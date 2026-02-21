'use client';

import { Chip, Tabs, Tab } from '@heroui/react';

type TransactionType = 'donation_made' | 'donation_received' | 'withdrawal' | 'refund';
type TabKey = 'all' | TransactionType;

type Totals = {
  all: number;
  donation_made: number;
  donation_received: number;
  withdrawal: number;
  refund: number;
};

type StatementTabsProps = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  totals: Totals;
};

const StatementTabs = ({ activeTab, onTabChange, totals }: StatementTabsProps) => {
  return (
    <Tabs
      selectedKey={activeTab}
      onSelectionChange={(key) => onTabChange(key as TabKey)}
    >
      <Tab
        key="all"
        title={
          <div className="flex items-center gap-2">
            Todas
            <Chip size="sm" variant="flat">{totals.all}</Chip>
          </div>
        }
      />
      <Tab
        key="donation_made"
        title={
          <div className="flex items-center gap-2">
            Doações feitas
            <Chip size="sm" variant="flat" color="danger">{totals.donation_made}</Chip>
          </div>
        }
      />
      <Tab
        key="donation_received"
        title={
          <div className="flex items-center gap-2">
            Doações recebidas
            <Chip size="sm" variant="flat" color="success">{totals.donation_received}</Chip>
          </div>
        }
      />
      <Tab
        key="withdrawal"
        title={
          <div className="flex items-center gap-2">
            Saques
            <Chip size="sm" variant="flat" color="primary">{totals.withdrawal}</Chip>
          </div>
        }
      />
    </Tabs>
  );
};

export { StatementTabs };
