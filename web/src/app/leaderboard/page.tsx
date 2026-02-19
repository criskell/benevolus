'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody, Spinner } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { api } from '@/lib/http/api-client';
import LeaderboardHero from './leaderboard-hero';
import LeaderboardTabs from './leaderboard-tabs';
import LeaderboardItem from './leaderboard-item';
import LeaderboardFooter from './leaderboard-footer';

type LeaderboardEntry = {
  id: number | null;
  name: string;
  totalDonated?: number;
  totalCampaigns?: number;
}

type TabKey = 'donors' | 'campaigns' | 'creators';

const endpoints: Record<TabKey, string> = {
  donors: '/leaderboard/donors',
  campaigns: '/leaderboard/campaigns',
  creators: '/leaderboard/creators',
};

const LeaderboardPage = () => {
  const t = useTranslations('leaderboard');
  const [selectedTab, setSelectedTab] = useState<TabKey>('donors');
  const [data, setData] = useState<Record<TabKey, LeaderboardEntry[]>>({
    donors: [],
    campaigns: [],
    creators: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await api.get(endpoints[selectedTab], {
          params: { limit: 50 }
        });

        let entries: LeaderboardEntry[] = [];
        if (response.data) {
          if (Array.isArray(response.data)) {
            entries = response.data;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            entries = response.data.data;
          }
        }

        setData((prev) => ({ ...prev, [selectedTab]: entries }));
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setData((prev) => ({ ...prev, [selectedTab]: [] }));
        setError(false);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [selectedTab]);

  const currentData = data[selectedTab];

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-blue-50/20 dark:from-default-100 dark:via-background dark:to-default-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/5 dark:bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-[1280px] mx-auto px-4 sm:px-8 py-16 relative">
        <LeaderboardHero />

        <LeaderboardTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Spinner size="lg" color="primary" />
              <p className="mt-4 text-default-600 font-medium">{t('loading')}</p>
            </div>
          ) : error ? (
            <Card className="border-2 border-red-200 bg-red-50/50 dark:bg-red-950/20 dark:border-red-800/40" shadow="none">
              <CardBody className="py-12 text-center">
                <Icon icon="solar:danger-triangle-bold" width={64} className="text-red-500 mx-auto mb-4" />
                <p className="text-lg text-red-700 dark:text-red-400 font-semibold">{t('error')}</p>
              </CardBody>
            </Card>
          ) : currentData.length === 0 ? (
            <Card className="border-2 border-blue-200/40 bg-blue-50/30 dark:bg-blue-950/20 dark:border-blue-800/40" shadow="none">
              <CardBody className="py-12 text-center">
                <Icon icon="solar:inbox-line-bold-duotone" width={64} className="text-blue-400 mx-auto mb-4" />
                <p className="text-lg text-default-600 font-semibold">{t('no_data')}</p>
              </CardBody>
            </Card>
          ) : (
            <div className="space-y-4">
              {currentData.map((entry, index) => (
                <LeaderboardItem key={`${selectedTab}-${index}`} entry={entry} rank={index + 1} />
              ))}
            </div>
          )}
        </motion.div>

        {!loading && !error && currentData.length > 0 && <LeaderboardFooter />}
      </div>
    </main>
  );
};

export default LeaderboardPage;
