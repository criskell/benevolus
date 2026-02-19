'use client';

import { Card, CardBody, Avatar, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';
import { formatMoney } from '@/lib/utils/format-money';

type LeaderboardEntry = {
  id: number | null;
  name: string;
  totalDonated?: number;
  totalCampaigns?: number;
}

type LeaderboardItemProps = {
  entry: LeaderboardEntry;
  rank: number;
}

const getMedalIcon = (rank: number) => {
  if (rank === 1) return { icon: 'solar:cup-star-bold', color: 'from-amber-400 to-yellow-500' };
  if (rank === 2) return { icon: 'solar:cup-star-bold', color: 'from-gray-300 to-gray-400' };
  if (rank === 3) return { icon: 'solar:cup-star-bold', color: 'from-orange-400 to-amber-600' };
  return null;
};

const LeaderboardItem = ({ entry, rank }: LeaderboardItemProps) => {
  const t = useTranslations('leaderboard');
  const medal = getMedalIcon(rank);
  const isTopThree = rank <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (rank - 1) * 0.05, duration: 0.3 }}
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
                    {getUserNameInitials(entry.name)}
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

export default LeaderboardItem;
