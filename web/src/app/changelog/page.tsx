'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Button } from '@heroui/react';
import { motion } from 'framer-motion';

import { ChangelogHero } from './changelog-hero';
import { ChangelogStats } from './changelog-stats';
import { ChangelogEntryCard, type ChangelogEntry, type ChangeType } from './changelog-entry';
import { ChangelogFooter } from './changelog-footer';

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

const ChangelogPage = () => {
  const t = useTranslations();
  const [filter, setFilter] = useState<'all' | ChangeType>('all');

  const filteredData = changelogData.map(entry => ({
    ...entry,
    changes: filter === 'all' ? entry.changes : entry.changes.filter(c => c.type === filter),
  })).filter(entry => entry.changes.length > 0);

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-background via-default-50/30 to-background">
      <ChangelogHero />

      {/* Stats & Filters */}
      <section className="relative px-6 -mt-16 mb-20">
        <div className="container max-w-6xl mx-auto">
          <ChangelogStats entries={changelogData} />

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

      {/* Timeline */}
      <section className="relative px-6 pb-24 md:pb-32">
        <div className="container max-w-6xl mx-auto">
          <div className="relative">
            {/* Animated Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-blue-400/50 to-transparent hidden md:block overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-blue-300/30 to-white/0 animate-shimmer" />
            </div>

            <div className="space-y-12">
              {filteredData.map((entry, index) => (
                <ChangelogEntryCard
                  key={entry.version}
                  entry={entry}
                  index={index}
                  isLatest={index === 0}
                />
              ))}
            </div>
          </div>

          <ChangelogFooter />
        </div>
      </section>
    </main>
  );
};

export default ChangelogPage;
