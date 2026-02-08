'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function TestimonialsSection() {
  const t = useTranslations('home.testimonials');

  return (
    <section className="relative w-full py-20">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          {t('title')}
        </h2>
        <p className="text-default-500 text-lg max-w-xl mx-auto">
          {t('subtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Card em destaque (maior) */}
        <motion.div
          className="lg:col-span-2 lg:row-span-1 flex flex-col p-8 rounded-3xl border border-primary-200/50 bg-gradient-to-br from-primary-50/60 to-white dark:from-primary-950/30 dark:to-default-50/50"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Icon
            icon="solar:quote-outline"
            className="text-primary/70 mb-4"
            width={40}
            height={40}
          />
          <p className="text-foreground text-lg md:text-xl leading-relaxed mb-6 flex-1">
            &ldquo;{t('quote_0')}&rdquo;
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
              {t('name_0').charAt(0)}
            </div>
            <div>
              <span className="font-semibold block">{t('name_0')}</span>
              <span className="text-default-500 text-sm">{t('role_0')}</span>
            </div>
          </div>
        </motion.div>

        {/* Card menor */}
        <motion.div
          className="flex flex-col p-6 rounded-3xl border border-default-200 bg-white/80 dark:bg-default-50/50 transition-colors hover:border-default-300"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Icon icon="solar:quote-outline" className="text-primary/60 mb-3" width={28} height={28} />
          <p className="text-foreground leading-relaxed mb-4 flex-1 text-sm">&ldquo;{t('quote_1')}&rdquo;</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-default-200 flex items-center justify-center text-default-600 font-semibold text-sm">
              {t('name_1').charAt(0)}
            </div>
            <div>
              <span className="font-semibold text-sm block">{t('name_1')}</span>
              <span className="text-default-500 text-xs">{t('role_1')}</span>
            </div>
          </div>
        </motion.div>

        {/* Terceiro card */}
        <motion.div
          className="lg:col-span-1 flex flex-col p-6 rounded-3xl border border-default-200 bg-white/80 dark:bg-default-50/50 transition-colors hover:border-default-300"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Icon icon="solar:quote-outline" className="text-primary/60 mb-3" width={28} height={28} />
          <p className="text-foreground leading-relaxed mb-4 flex-1 text-sm">&ldquo;{t('quote_2')}&rdquo;</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-default-200 flex items-center justify-center text-default-600 font-semibold text-sm">
              {t('name_2').charAt(0)}
            </div>
            <div>
              <span className="font-semibold text-sm block">{t('name_2')}</span>
              <span className="text-default-500 text-xs">{t('role_2')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
