'use client';

import { Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const LeaderboardFooter = () => {
  const t = useTranslations('leaderboard');

  return (
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
            {t('footer_title')}
          </h3>
          <p className="text-default-600 text-lg mb-6 max-w-2xl mx-auto">
            {t('footer_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/campaigns"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              <Icon icon="solar:heart-bold" width={24} />
              {t('footer_donate')}
            </a>
            <a
              href="/campaigns/create"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-blue-500 hover:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 font-semibold transition-all duration-300 hover:scale-105"
            >
              <Icon icon="solar:add-circle-bold" width={24} />
              {t('footer_create')}
            </a>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default LeaderboardFooter;
