'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const statKeys = [
  'solar:hand-money-outline',
  'solar:users-group-rounded-outline',
  'solar:heart-outline',
] as const;

export function ImpactSection() {
  const t = useTranslations('home.impact');

  const stats = [
    { value: t('stat_0_value'), label: t('stat_0_label') },
    { value: t('stat_1_value'), label: t('stat_1_label') },
    { value: t('stat_2_value'), label: t('stat_2_label') },
  ];

  return (
    <section className="relative w-full py-24 -mx-4 md:-mx-8 px-4 md:px-8 overflow-hidden">
      {/* Faixa em gradiente suave */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'linear-gradient(160deg, oklch(0.94 0.06 117.33) 0%, oklch(0.97 0.03 117.33) 50%, oklch(0.95 0.05 200) 100%)',
        }}
      />
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_80%_80%_at_50%_120%,_oklch(0.88_0.12_117.33_/_0.15),_transparent)]" />
      <div className="relative flex flex-col items-center">
        <motion.h2
          className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2 text-center"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {t('title')}
        </motion.h2>
        <motion.p
          className="text-default-600 mb-14 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {t('subtitle')}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 w-full max-w-4xl">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <div className="mb-4 p-3 rounded-2xl bg-white/60 dark:bg-default-100/40 text-primary">
                <Icon icon={statKeys[index]} width={32} height={32} />
              </div>
              <span className="text-4xl md:text-5xl font-bold tracking-tight tabular-nums mb-1 text-foreground">
                {stat.value}
              </span>
              <span className="text-default-600 font-medium text-sm md:text-base max-w-[140px]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
