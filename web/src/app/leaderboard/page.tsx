'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody, Tabs, Tab, Spinner, Avatar, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { api } from '@/lib/http/api-client';
import { formatMoney } from '@/lib/utils/format-money';

type LeaderboardEntry = {
  id: number | null;
  name: string;
  totalDonated?: number;
  totalCampaigns?: number;
}

type TabKey = 'donors' | 'campaigns' | 'creators';

const LeaderboardPage = () => {
  const t = useTranslations('leaderboard');
  const [selectedTab, setSelectedTab] = useState<TabKey>('donors');
  const [donors, setDonors] = useState<LeaderboardEntry[]>([]);
  const [campaigns, setCampaigns] = useState<LeaderboardEntry[]>([]);
  const [creators, setCreators] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(false);

      try {
        const endpoint = 
          selectedTab === 'donors' ? '/leaderboard/donors' :
          selectedTab === 'campaigns' ? '/leaderboard/campaigns' :
          '/leaderboard/creators';

        const response = await api.get(endpoint, {
          params: { limit: 50 }
        });

        // Handle different response structures
        let data = [];
        if (response.data) {
          if (Array.isArray(response.data)) {
            data = response.data;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            data = response.data.data;
          }
        }

        if (selectedTab === 'donors') {
          setDonors(data);
        } else if (selectedTab === 'campaigns') {
          setCampaigns(data);
        } else {
          setCreators(data);
        }
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        // Set empty array instead of error to show "no data" state
        if (selectedTab === 'donors') {
          setDonors([]);
        } else if (selectedTab === 'campaigns') {
          setCampaigns([]);
        } else {
          setCreators([]);
        }
        setError(false); // Don't show error, just show empty state
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [selectedTab]);

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return { icon: 'solar:cup-star-bold', color: 'from-amber-400 to-yellow-500' };
    if (rank === 2) return { icon: 'solar:cup-star-bold', color: 'from-gray-300 to-gray-400' };
    if (rank === 3) return { icon: 'solar:cup-star-bold', color: 'from-orange-400 to-amber-600' };
    return null;
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getCurrentData = () => {
    if (selectedTab === 'donors') return donors;
    if (selectedTab === 'campaigns') return campaigns;
    return creators;
  };

  const renderLeaderboardItem = (entry: LeaderboardEntry, index: number) => {
    const rank = index + 1;
    const medal = getMedalIcon(rank);
    const isTopThree = rank <= 3;

    return (
      <motion.div
        key={`${selectedTab}-${index}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
      >
        <Card
          className={`
            border-2 transition-all duration-300 hover:scale-[1.02] group
            ${isTopThree 
              ? 'bg-gradient-to-br from-blue-50/80 via-white to-blue-50/50 dark:from-blue-950/30 dark:via-default-50 dark:to-blue-950/20 border-blue-200/60 dark:border-blue-800/40 hover:border-blue-400/80 dark:hover:border-blue-600/60' 
              : 'border-blue-200/40 dark:border-blue-900/30 hover:border-blue-300/60 dark:hover:border-blue-700/50 bg-white/50 dark:bg-default-50/50'}
          `}
          shadow="none"
        >
          <CardBody className="p-6">
            <div className="flex items-center gap-6">
              {/* Rank */}
              <div className="flex-shrink-0">
                {medal ? (
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${medal.color} flex items-center justify-center shadow-lg`}>
                      <Icon icon={medal.icon} width={32} className="text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white dark:border-default-100">
                      {rank}
                    </div>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center border-2 border-blue-300/50 dark:border-blue-700/50">
                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                      {rank}
                    </span>
                  </div>
                )}
              </div>

              {/* Avatar & Name */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <Avatar
                  name={entry.name}
                  className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold"
                  size="lg"
                  showFallback
                  fallback={
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-lg">
                      {getInitials(entry.name)}
                    </div>
                  }
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {entry.name}
                  </h3>
                  {isTopThree && (
                    <Chip 
                      size="sm" 
                      className="mt-1 bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-700 dark:text-blue-300 border border-blue-400/30"
                      startContent={<Icon icon="solar:star-bold" width={14} />}
                    >
                      Top {rank}
                    </Chip>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="text-right flex-shrink-0">
                {entry.totalDonated !== undefined && (
                  <div>
                    <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
                      {formatMoney(entry.totalDonated)}
                    </div>
                    <div className="text-xs text-default-500 font-medium mt-1">
                      {t('total_donated_label')}
                    </div>
                  </div>
                )}
                {entry.totalCampaigns !== undefined && (
                  <div>
                    <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
                      {entry.totalCampaigns}
                    </div>
                    <div className="text-xs text-default-500 font-medium mt-1">
                      {t('total_campaigns_label')}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    );
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-blue-50/20 dark:from-default-100 dark:via-background dark:to-default-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/5 dark:bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-[1280px] mx-auto px-4 sm:px-8 py-16 relative">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-100/70 via-blue-50/50 to-blue-100/70 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-blue-900/30 text-blue-900 dark:text-blue-300 px-6 py-2.5 text-sm font-bold mb-8 border-2 border-blue-300/50 dark:border-blue-700/50 backdrop-blur-sm">
            <Icon icon="solar:ranking-bold-duotone" className="size-5 text-blue-600 dark:text-blue-400" />
            {t('hero_badge')}
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h1>

          <p className="text-default-600 text-lg md:text-xl max-w-3xl mx-auto">
            {t('subtitle')}
          </p>

          {/* Decorative elements */}
          <div className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-blue-400/40 animate-float hidden lg:block" />
          <div className="absolute top-40 right-[15%] w-3 h-3 rounded-full bg-blue-500/40 animate-float-delayed hidden lg:block" />
          <div className="absolute bottom-32 left-[20%] w-2 h-2 rounded-full bg-blue-400/40 animate-float hidden lg:block" />
        </motion.div>

        {/* Tabs */}
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
                onSelectionChange={(key) => setSelectedTab(key as TabKey)}
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
          ) : getCurrentData().length === 0 ? (
            <Card className="border-2 border-blue-200/40 bg-blue-50/30 dark:bg-blue-950/20 dark:border-blue-800/40" shadow="none">
              <CardBody className="py-12 text-center">
                <Icon icon="solar:inbox-line-bold-duotone" width={64} className="text-blue-400 mx-auto mb-4" />
                <p className="text-lg text-default-600 font-semibold">{t('no_data')}</p>
              </CardBody>
            </Card>
          ) : (
            <div className="space-y-4">
              {getCurrentData().map((entry, index) => renderLeaderboardItem(entry, index))}
            </div>
          )}
        </motion.div>

        {/* Footer CTA */}
        {!loading && !error && getCurrentData().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16"
          >
            <Card className="border-2 border-blue-300/50 dark:border-blue-700/50 overflow-hidden relative bg-gradient-to-br from-blue-50/60 via-blue-100/40 to-blue-50/60 dark:from-blue-950/30 dark:via-blue-900/20 dark:to-blue-950/30 backdrop-blur-sm" shadow="none">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent" />
              <CardBody className="py-12 px-8 text-center relative">
                <Icon icon="solar:heart-shine-bold-duotone" width={64} className="text-blue-500 dark:text-blue-400 mx-auto mb-6 animate-pulse" />
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Faça parte desta lista!
                </h3>
                <p className="text-default-600 text-lg mb-6 max-w-2xl mx-auto">
                  Sua generosidade pode transformar vidas e inspirar outros a fazer o bem.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="/campaigns"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Icon icon="solar:heart-bold" width={24} />
                    Fazer uma doação
                  </a>
                  <a
                    href="/campaigns/create"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-blue-500 hover:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Icon icon="solar:add-circle-bold" width={24} />
                    Criar campanha
                  </a>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default LeaderboardPage;
