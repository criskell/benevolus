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

const styles = [
  { 
    iconBg: 'bg-gradient-to-br from-rose-500/15 to-pink-500/10',
    iconColor: 'text-rose-600 dark:text-rose-500',
    accent: 'group-hover:border-rose-200 dark:group-hover:border-rose-800',
    glow: 'group-hover:shadow-rose-500/10',
  },
  { 
    iconBg: 'bg-gradient-to-br from-amber-500/15 to-orange-500/10',
    iconColor: 'text-amber-600 dark:text-amber-500',
    accent: 'group-hover:border-amber-200 dark:group-hover:border-amber-800',
    glow: 'group-hover:shadow-amber-500/10',
  },
  { 
    iconBg: 'bg-gradient-to-br from-blue-500/15 to-cyan-500/10',
    iconColor: 'text-blue-600 dark:text-blue-500',
    accent: 'group-hover:border-blue-200 dark:group-hover:border-blue-800',
    glow: 'group-hover:shadow-blue-500/10',
  },
  { 
    iconBg: 'bg-gradient-to-br from-emerald-500/15 to-teal-500/10',
    iconColor: 'text-emerald-600 dark:text-emerald-500',
    accent: 'group-hover:border-emerald-200 dark:group-hover:border-emerald-800',
    glow: 'group-hover:shadow-emerald-500/10',
  },
];

export const CategoriesSection = () => {
  const t = useTranslations('home.categories');

  return (
    <section className="relative w-full py-24">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {t('title')}
        </h2>
        <p className="text-default-600 text-xl max-w-2xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
        {categoryIds.map((id, index) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <Link
              href={`/campaigns?category=${encodeURIComponent(t(`${id}_slug`))}`}
              className={`group relative flex flex-col p-8 h-full rounded-3xl border border-default-200 bg-white dark:bg-default-50 transition-all duration-300 hover:-translate-y-1 ${styles[index].accent} block overflow-hidden`}
            >
              {/* Forma decorativa no hover */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-3xl"
                style={{ background: 'oklch(0.92 0.04 250)' }}
              />
              
              {/* Ícone grande com gradiente */}
              <div className={`relative w-20 h-20 mb-6 rounded-2xl ${styles[index].iconBg} flex items-center justify-center ${styles[index].iconColor} group-hover:scale-110 transition-transform duration-300`}>
                <Icon icon={icons[index]} width={40} height={40} />
              </div>
              
              <div className="relative flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-foreground tracking-tight mb-2 group-hover:text-foreground">
                  {t(`${id}_title`)}
                </h3>
                <p className="text-default-500 leading-relaxed mb-6">
                  {t(`${id}_description`)}
                </p>
                
                {/* Indicador de link */}
                <div className="flex items-center gap-2 text-sm font-semibold text-default-400 group-hover:text-primary transition-colors mt-auto">
                  <span>{t('view_campaigns')}</span>
                  <Icon icon="solar:arrow-right-outline" width={18} height={18} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
