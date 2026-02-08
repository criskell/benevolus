'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody, CardHeader, Chip, Button } from '@heroui/react';
import { motion } from 'framer-motion';

interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    type: 'feature' | 'bugfix' | 'improvement' | 'breaking';
    description: string;
  }[];
}

const changelogData: ChangelogEntry[] = [
  {
    version: 'v2.5.0',
    date: '2026-02-08',
    changes: [
      { type: 'feature', description: 'changelog.v2_5_0.feature_1' },
      { type: 'feature', description: 'changelog.v2_5_0.feature_2' },
      { type: 'improvement', description: 'changelog.v2_5_0.improvement_1' },
      { type: 'bugfix', description: 'changelog.v2_5_0.bugfix_1' },
    ],
  },
  {
    version: 'v2.4.0',
    date: '2026-01-20',
    changes: [
      { type: 'feature', description: 'changelog.v2_4_0.feature_1' },
      { type: 'feature', description: 'changelog.v2_4_0.feature_2' },
      { type: 'improvement', description: 'changelog.v2_4_0.improvement_1' },
      { type: 'bugfix', description: 'changelog.v2_4_0.bugfix_1' },
      { type: 'bugfix', description: 'changelog.v2_4_0.bugfix_2' },
    ],
  },
  {
    version: 'v2.3.0',
    date: '2025-12-15',
    changes: [
      { type: 'feature', description: 'changelog.v2_3_0.feature_1' },
      { type: 'feature', description: 'changelog.v2_3_0.feature_2' },
      { type: 'improvement', description: 'changelog.v2_3_0.improvement_1' },
      { type: 'improvement', description: 'changelog.v2_3_0.improvement_2' },
    ],
  },
  {
    version: 'v2.2.0',
    date: '2025-11-05',
    changes: [
      { type: 'feature', description: 'changelog.v2_2_0.feature_1' },
      { type: 'improvement', description: 'changelog.v2_2_0.improvement_1' },
      { type: 'bugfix', description: 'changelog.v2_2_0.bugfix_1' },
    ],
  },
  {
    version: 'v2.1.0',
    date: '2025-10-01',
    changes: [
      { type: 'feature', description: 'changelog.v2_1_0.feature_1' },
      { type: 'feature', description: 'changelog.v2_1_0.feature_2' },
      { type: 'improvement', description: 'changelog.v2_1_0.improvement_1' },
      { type: 'bugfix', description: 'changelog.v2_1_0.bugfix_1' },
      { type: 'bugfix', description: 'changelog.v2_1_0.bugfix_2' },
    ],
  },
  {
    version: 'v2.0.0',
    date: '2025-09-01',
    changes: [
      { type: 'breaking', description: 'changelog.v2_0_0.breaking_1' },
      { type: 'feature', description: 'changelog.v2_0_0.feature_1' },
      { type: 'feature', description: 'changelog.v2_0_0.feature_2' },
      { type: 'feature', description: 'changelog.v2_0_0.feature_3' },
      { type: 'improvement', description: 'changelog.v2_0_0.improvement_1' },
    ],
  },
];

const getTypeConfig = (type: ChangelogEntry['changes'][0]['type']) => {
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

export default function ChangelogPage() {
  const t = useTranslations();
  const [filter, setFilter] = useState<'all' | 'feature' | 'bugfix' | 'improvement' | 'breaking'>('all');

  const filteredData = changelogData.map(entry => ({
    ...entry,
    changes: filter === 'all' ? entry.changes : entry.changes.filter(c => c.type === filter)
  })).filter(entry => entry.changes.length > 0);

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-background via-default-50/30 to-background">
      {/* Hero Section with Animated Elements */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center px-6 pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-300/20 via-transparent to-transparent" />
          
          {/* Floating particles */}
          <div className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-blue-400/40 animate-float" />
          <div className="absolute top-40 right-[15%] w-3 h-3 rounded-full bg-blue-500/40 animate-float-delayed" />
          <div className="absolute bottom-32 left-[20%] w-2 h-2 rounded-full bg-blue-400/40 animate-float" />
          <div className="absolute bottom-20 right-[25%] w-3 h-3 rounded-full bg-blue-500/40 animate-float-delayed" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container max-w-5xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-100/70 via-blue-50/50 to-blue-100/70 text-blue-900 px-6 py-2.5 text-sm font-bold mb-8 border-2 border-blue-300/50 backdrop-blur-sm"
          >
            <Icon icon="solar:history-bold-duotone" className="size-5 animate-pulse text-blue-600" />
            {t('changelog.hero_badge')}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl md:leading-[1.1] mb-6"
          >
            <span className="bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              {t('changelog.title')}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-lg text-default-600 max-w-3xl mx-auto sm:text-xl leading-relaxed font-medium"
          >
            {t('changelog.subtitle')}
          </motion.p>

          {/* Decorative elements */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-400/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl" />
        </motion.div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="relative px-6 -mt-16 mb-20">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: 'solar:rocket-2-bold-duotone',
                value: changelogData.length,
                label: t('changelog.stats.versions'),
                gradient: 'from-blue-600 to-blue-800',
                bgGradient: 'from-blue-50/70 to-blue-100/70'
              },
              {
                icon: 'solar:sparkler-bold-duotone',
                value: changelogData.reduce((acc, entry) => acc + entry.changes.filter(c => c.type === 'feature').length, 0),
                label: t('changelog.stats.features'),
                gradient: 'from-blue-500 to-blue-700',
                bgGradient: 'from-blue-50/70 to-blue-100/70'
              },
              {
                icon: 'solar:bug-minimalistic-bold-duotone',
                value: changelogData.reduce((acc, entry) => acc + entry.changes.filter(c => c.type === 'bugfix').length, 0),
                label: t('changelog.stats.fixes'),
                gradient: 'from-blue-600 to-blue-900',
                bgGradient: 'from-blue-50/70 to-blue-100/70'
              }
            ].map((stat, index) => (
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

          {/* Filter buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mt-12"
          >
            {[
              { key: 'all' as const, label: t('changelog.filter_all'), icon: 'solar:list-bold-duotone' },
              { key: 'feature' as const, label: t('changelog.types.feature'), icon: 'solar:sparkler-bold-duotone' },
              { key: 'improvement' as const, label: t('changelog.types.improvement'), icon: 'solar:settings-minimalistic-bold-duotone' },
              { key: 'bugfix' as const, label: t('changelog.types.bugfix'), icon: 'solar:bug-minimalistic-bold-duotone' },
              { key: 'breaking' as const, label: t('changelog.types.breaking'), icon: 'solar:danger-circle-bold-duotone' },
            ].map((filterBtn) => (
              <Button
                key={filterBtn.key}
                onPress={() => setFilter(filterBtn.key)}
                variant={filter === filterBtn.key ? 'solid' : 'bordered'}
                color={filter === filterBtn.key ? 'primary' : 'default'}
                startContent={<Icon icon={filterBtn.icon} className="size-4" />}
                className={`font-semibold transition-all duration-300 ${filter === filterBtn.key ? 'scale-105' : 'hover:scale-105 border-blue-200'}`}
              >
                {filterBtn.label}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline with Enhanced Design */}
      <section className="relative px-6 pb-24 md:pb-32">
        <div className="container max-w-6xl mx-auto">
          <div className="relative">
            {/* Animated Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-blue-400/50 to-transparent hidden md:block overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-blue-300/30 to-white/0 animate-shimmer" />
            </div>

            <div className="space-y-12">
              {filteredData.map((entry, index) => {
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
                        {index === 0 && (
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
              })}
            </div>
          </div>

          {/* Enhanced Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="mt-16 border-2 border-blue-300/50 overflow-hidden relative bg-gradient-to-br from-blue-50/40 via-blue-100/30 to-blue-50/40 backdrop-blur-sm shadow-none">
              {/* Animated background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.08),rgba(255,255,255,0))]" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-transparent rounded-full blur-3xl" />
              
              <CardBody className="p-12 text-center relative z-10">
                <div className="inline-flex rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-1 mb-6">
                  <div className="rounded-full bg-background p-4">
                    <Icon icon="solar:bell-bing-bold-duotone" className="text-blue-600 size-10 animate-bounce" />
                  </div>
                </div>
                <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent">
                  {t('changelog.footer.title')}
                </h3>
                <p className="text-default-600 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                  {t('changelog.footer.description')}
                </p>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
