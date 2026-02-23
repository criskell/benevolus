'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';

import type { ChangelogEntry } from './changelog-entry';

type ChangelogStatsProps = {
  entries: ChangelogEntry[];
};

const ChangelogStats = ({ entries }: ChangelogStatsProps) => {
  const t = useTranslations();

  const stats = [
    {
      icon: 'solar:rocket-2-bold-duotone',
      value: entries.length,
      label: t('changelog.stats.versions'),
      gradient: 'from-blue-600 to-blue-800',
      bgGradient: 'from-blue-50/70 to-blue-100/70',
    },
    {
      icon: 'solar:sparkler-bold-duotone',
      value: entries.reduce((acc, entry) => acc + entry.changes.filter(c => c.type === 'feature').length, 0),
      label: t('changelog.stats.features'),
      gradient: 'from-blue-500 to-blue-700',
      bgGradient: 'from-blue-50/70 to-blue-100/70',
    },
    {
      icon: 'solar:bug-minimalistic-bold-duotone',
      value: entries.reduce((acc, entry) => acc + entry.changes.filter(c => c.type === 'bugfix').length, 0),
      label: t('changelog.stats.fixes'),
      gradient: 'from-blue-600 to-blue-900',
      bgGradient: 'from-blue-50/70 to-blue-100/70',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
        >
          <Card className={`border-2 border-divider/60 transition-all duration-500 hover:scale-105 bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm group shadow-none`}>
            <CardBody className="flex flex-row items-center gap-5 p-8">
              <div className={`rounded-2xl bg-gradient-to-br ${stat.gradient} p-4 group-hover:scale-110 transition-all duration-300`}>
                <Icon icon={stat.icon} className="size-8 text-white" />
              </div>
              <div>
                <p className="text-4xl font-black text-foreground mb-1 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-default-600">{stat.label}</p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export { ChangelogStats };
