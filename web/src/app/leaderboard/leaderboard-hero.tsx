'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const LeaderboardHero = () => {
  const t = useTranslations('leaderboard');

  return (
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
  );
};

export default LeaderboardHero;
