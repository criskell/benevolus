'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const iconKeys = [
  'solar:shield-check-outline',
  'solar:lock-keyhole-outline',
  'solar:document-text-outline',
] as const;

const colors = [
  { bg: 'bg-blue-500/5', ring: 'ring-blue-500/10', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-600' },
  { bg: 'bg-purple-500/5', ring: 'ring-purple-500/10', iconBg: 'bg-purple-500/10', iconColor: 'text-purple-600' },
  { bg: 'bg-emerald-500/5', ring: 'ring-emerald-500/10', iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-600' },
];

export const TrustSection = () => {
  const t = useTranslations('home.trust');

  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Fundo decorativo suave */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.97 0.015 250 / 0.7), transparent)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Cabeçalho */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-8 ring-8 ring-primary/5">
            <Icon icon="solar:shield-check-outline" width={40} height={40} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
            {t('title')}
          </h2>
          <p className="text-default-600 text-xl max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Três pilares como cards sofisticados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {([0, 1, 2] as const).map((index) => (
            <motion.div
              key={index}
              className={`group relative flex flex-col p-8 lg:p-10 rounded-3xl bg-white dark:bg-default-50 border border-default-200 hover:border-default-300 transition-all duration-300 ${colors[index].bg}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              {/* Ícone com anel decorativo */}
              <div className={`relative w-fit mb-6 ${colors[index].ring} ring-8`}>
                <div className={`w-16 h-16 rounded-2xl ${colors[index].iconBg} ${colors[index].iconColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon icon={iconKeys[index]} width={32} height={32} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                {t(`item_${index}_title`)}
              </h3>
              <p className="text-default-500 leading-relaxed">
                {t(`item_${index}_description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
