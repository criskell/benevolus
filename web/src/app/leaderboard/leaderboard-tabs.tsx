'use client';

import { Card, CardBody, Tabs, Tab } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

type TabKey = 'donors' | 'campaigns' | 'creators';

type LeaderboardTabsProps = {
  selectedTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const LeaderboardTabs = ({ selectedTab, onTabChange }: LeaderboardTabsProps) => {
  const t = useTranslations('leaderboard');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="mb-12"
    >
      <Card className="border-2 border-blue-200/40 dark:border-blue-800/40 bg-white/80 dark:bg-default-50/80 backdrop-blur-sm" shadow="none">
        <CardBody className="p-2">
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => onTabChange(key as TabKey)}
            variant="light"
            color="primary"
            size="lg"
            classNames={{
              tabList: "gap-2 w-full",
              cursor: "bg-gradient-to-r from-blue-500 to-blue-600",
              tab: "h-14 font-semibold text-base",
              tabContent: "group-data-[selected=true]:text-white"
            }}
          >
            <Tab
              key="donors"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:heart-bold-duotone" width={24} />
                  <span>{t('tabs.donors')}</span>
                </div>
              }
            />
            <Tab
              key="campaigns"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:hand-heart-bold-duotone" width={24} />
                  <span>{t('tabs.campaigns')}</span>
                </div>
              }
            />
            <Tab
              key="creators"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:users-group-rounded-bold-duotone" width={24} />
                  <span>{t('tabs.creators')}</span>
                </div>
              }
            />
          </Tabs>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default LeaderboardTabs;
