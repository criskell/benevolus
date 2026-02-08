'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const iconKeys = [
  'solar:shield-check-outline',
  'solar:hand-money-outline',
  'solar:users-group-rounded-outline',
] as const;

export function WhyBenevolus() {
  const t = useTranslations('home.why');

  return (
    <section className="relative w-full rounded-[2rem] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] min-h-[420px]">
        {/* Bloco esquerdo: título, subtítulo e resumo dos 3 pilares */}
        <motion.div
          className="relative flex flex-col justify-center px-8 py-16 lg:py-24 lg:px-12 order-2 lg:order-1 bg-default-50 dark:bg-default-100/30"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-foreground leading-[1.15] mb-4">
            {t('title')}
          </h2>
          <p className="text-default-500 text-lg max-w-md leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Bloco direito: lista de diferenciais (não-cards) */}
        <div className="relative flex flex-col justify-center px-8 py-16 lg:py-24 lg:px-14 bg-default-50 dark:bg-default-100/30 order-1 lg:order-2">
          <div className="space-y-0">
            {([0, 1, 2] as const).map((index) => (
              <motion.div
                key={index}
                className="group flex gap-6 py-8 first:pt-0 last:pb-0 border-b border-default-200/80 last:border-b-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="shrink-0 flex flex-col items-center">
                  <span className="text-5xl font-bold tabular-nums text-primary/25 group-hover:text-primary/40 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary mt-2 group-hover:bg-primary/25 transition-colors">
                    <Icon icon={iconKeys[index]} width={24} height={24} />
                  </div>
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <h3 className="text-xl font-semibold text-foreground mb-1.5 tracking-tight">
                    {t(`item_${index}_title`)}
                  </h3>
                  <p className="text-default-500 leading-relaxed text-[15px]">
                    {t(`item_${index}_description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
