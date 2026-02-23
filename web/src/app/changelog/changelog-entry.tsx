'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { motion } from 'framer-motion';

type ChangeType = 'feature' | 'bugfix' | 'improvement' | 'breaking';

type ChangelogEntry = {
  version: string;
  date: string;
  changes: {
    type: ChangeType;
    description: string;
  }[];
};

const getTypeConfig = (type: ChangeType) => {
  switch (type) {
    case 'feature':
      return {
        icon: 'solar:sparkler-bold-duotone',
        label: 'changelog.types.feature',
        color: 'primary' as const,
        gradient: 'from-blue-50/80 via-blue-100/60 to-blue-50/80',
        iconGradient: 'from-blue-600 to-blue-800',
        iconColor: 'text-white',
        borderColor: 'border-blue-300/50',
      };
    case 'bugfix':
      return {
        icon: 'solar:bug-minimalistic-bold-duotone',
        label: 'changelog.types.bugfix',
        color: 'primary' as const,
        gradient: 'from-blue-50/80 via-blue-100/60 to-blue-50/80',
        iconGradient: 'from-blue-600 to-blue-800',
        iconColor: 'text-white',
        borderColor: 'border-blue-300/50',
      };
    case 'improvement':
      return {
        icon: 'solar:settings-minimalistic-bold-duotone',
        label: 'changelog.types.improvement',
        color: 'primary' as const,
        gradient: 'from-blue-50/80 via-blue-100/60 to-blue-50/80',
        iconGradient: 'from-blue-600 to-blue-800',
        iconColor: 'text-white',
        borderColor: 'border-blue-300/50',
      };
    case 'breaking':
      return {
        icon: 'solar:danger-circle-bold-duotone',
        label: 'changelog.types.breaking',
        color: 'primary' as const,
        gradient: 'from-blue-50/80 via-blue-100/60 to-blue-50/80',
        iconGradient: 'from-blue-600 to-blue-800',
        iconColor: 'text-white',
        borderColor: 'border-blue-300/50',
      };
  }
};

type ChangelogEntryCardProps = {
  entry: ChangelogEntry;
  index: number;
  isLatest: boolean;
};

const ChangelogEntryCard = ({ entry, index, isLatest }: ChangelogEntryCardProps) => {
  const t = useTranslations();
  const config = getTypeConfig(entry.changes[0]?.type || 'feature');

  return (
    <motion.div
      key={entry.version}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative"
    >
      {/* Animated Timeline dot */}
      <div className="absolute left-[1.1rem] top-10 w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 border-4 border-background hidden md:flex items-center justify-center z-10 group-hover:scale-125 transition-transform duration-300">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
      </div>

      <Card className="border-2 border-blue-200/40 transition-all duration-500 hover:scale-[1.02] hover:border-blue-400/60 ml-0 md:ml-20 group overflow-hidden relative bg-gradient-to-br from-background via-blue-50/20 to-background shadow-none">
        {/* Decorative corner gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl -translate-y-32 translate-x-32 group-hover:scale-150 transition-transform duration-700" />

        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pb-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className={`rounded-3xl bg-gradient-to-br ${config.iconGradient} p-4 group-hover:scale-110 transition-all duration-300`}>
                <Icon icon="solar:box-minimalistic-bold-duotone" className="size-10 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                {entry.version}
              </h2>
              <div className="flex items-center gap-2.5 text-default-500">
                <div className="p-1.5 rounded-lg bg-blue-100">
                  <Icon icon="solar:calendar-bold-duotone" className="size-4 text-blue-600" />
                </div>
                <time className="text-sm font-semibold">
                  {new Date(entry.date).toLocaleDateString(t('common.locale'), {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </div>
          {isLatest && (
            <Chip
              color="primary"
              variant="flat"
              startContent={<Icon icon="solar:star-bold" className="size-4 animate-pulse" />}
              className="font-bold text-base"
            >
              {t('changelog.latest')}
            </Chip>
          )}
        </CardHeader>

        <CardBody className="pt-0 relative z-10">
          <div className="grid gap-4">
            {entry.changes.map((change, changeIndex) => {
              const changeConfig = getTypeConfig(change.type);
              return (
                <motion.div
                  key={changeIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: changeIndex * 0.05, duration: 0.3 }}
                  className={`relative flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br ${changeConfig.gradient} border-2 ${changeConfig.borderColor} hover:scale-[1.02] transition-all duration-300 group/item overflow-hidden`}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000" />

                  <div className={`shrink-0 mt-0.5 p-3 rounded-xl bg-gradient-to-br ${changeConfig.iconGradient} group-hover/item:scale-110 transition-all duration-300`}>
                    <Icon icon={changeConfig.icon} className={`size-6 ${changeConfig.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0 space-y-3">
                    <p className="text-default-800 leading-relaxed font-semibold text-base">
                      {t(change.description)}
                    </p>
                    <Chip
                      size="sm"
                      color={changeConfig.color}
                      variant="flat"
                      className="font-bold"
                    >
                      {t(changeConfig.label)}
                    </Chip>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export { ChangelogEntryCard, type ChangelogEntry, type ChangeType };
