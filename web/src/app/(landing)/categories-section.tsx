'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const categoryIds = ['saude', 'emergenciais', 'educacao', 'animais'] as const;
const icons = [
  'solar:heart-pulse-outline',
  'solar:danger-triangle-outline',
  'solar:book-2-outline',
  'solar:cat-outline',
] as const;

export function CategoriesSection() {
  const t = useTranslations('home.categories');

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {categoryIds.map((id, index) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
          >
            <Link
              href={`/campaigns?category=${encodeURIComponent(t(`${id}_slug`))}`}
              className="group relative flex flex-col justify-between p-8 min-h-[200px] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-default-200 bg-default-50 dark:bg-default-100/40 block"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{
                  background: 'radial-gradient(circle at 70% 30%, oklch(0.97 0.02 117.33 / 0.4), transparent 50%)',
                }}
              />
              <div className="relative flex items-start justify-between gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                  <Icon icon={icons[index]} width={28} height={28} />
                </div>
                <span className="text-default-400 group-hover:text-primary text-4xl font-bold transition-colors shrink-0">
                  →
                </span>
              </div>
              <div className="relative mt-6">
                <h3 className="text-xl font-bold text-foreground tracking-tight mb-1.5">
                  {t(`${id}_title`)}
                </h3>
                <p className="text-default-500 text-sm leading-relaxed">
                  {t(`${id}_description`)}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
