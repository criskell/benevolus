'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const iconKeys = [
  'solar:shield-check-outline',
  'solar:lock-keyhole-outline',
  'solar:document-text-outline',
] as const;

export function TrustSection() {
  const t = useTranslations('home.trust');

  return (
    <section className="relative w-full py-20">
      <motion.div
        className="relative max-w-5xl mx-auto rounded-[2rem] overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative px-8 py-16 md:px-14 md:py-20">
          {/* Cabeçalho */}
          <div className="text-center mb-14">
            {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
              <Icon icon="solar:shield-check-outline" width={32} height={32} />
            </div> */}
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
              {t('title')}
            </h2>
            <p className="text-default-500 text-lg max-w-xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Três pilares em cards elevados */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([0, 1, 2] as const).map((index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-default-50/80 border border-default-200 hover:border-primary-200/50 transition-all duration-300"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary/15 group-hover:scale-105 transition-all duration-300">
                  <Icon icon={iconKeys[index]} width={32} height={32} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">
                  {t(`item_${index}_title`)}
                </h3>
                <p className="text-default-500 text-sm leading-relaxed">
                  {t(`item_${index}_description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
