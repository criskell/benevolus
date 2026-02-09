'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const stepStyles = [
  {
    icon: 'solar:notebook-bold-duotone',
    gradient: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: 'solar:share-bold-duotone',
    gradient: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    icon: 'solar:wallet-money-bold-duotone',
    gradient: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
];

export function HowItWorks() {
  const t = useTranslations('home.how_it_works');
  return (
    <section id="how-it-works" className="w-full py-20 md:py-24">
      <div className="relative">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            <Icon icon="solar:lightbulb-bolt-bold" width={20} />
            <span>{t('badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-default-600 text-lg md:text-xl max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Connection Line - Desktop */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-default-200 to-transparent" 
            style={{ 
              left: '16.666%',
              right: '16.666%',
            }}
          />

          {stepStyles.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-default-50/50 border border-default-200 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-600 text-white font-bold text-lg flex items-center justify-center shadow-lg">
                  {index + 1}
                </div>

                {/* Icon Container */}
                <div className={`relative mb-6 mt-4`}>
                  <div className={`absolute inset-0 blur-xl opacity-30 group-hover:opacity-50 transition-opacity bg-gradient-to-br ${step.gradient}`} />
                  <div className={`relative ${step.bgColor} rounded-2xl p-6 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon
                      icon={step.icon}
                      className={step.iconColor}
                      width={56}
                      height={56}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  {t(`step_${index}_title`)}
                </h3>
                <p className="text-default-600 leading-relaxed">
                  {t(`step_${index}_description`)}
                </p>

                {/* Arrow Indicator - Desktop */}
                {index < stepStyles.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-default-300">
                    <Icon icon="solar:arrow-right-linear" width={24} height={24} />
                  </div>
                )}

                {/* Arrow Indicator - Mobile */}
                {index < stepStyles.length - 1 && (
                  <div className="md:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 text-default-300">
                    <Icon icon="solar:arrow-down-linear" width={24} height={24} />
                  </div>
                )}

                {/* Decorative element */}
                <div 
                  className="absolute -z-10 inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, oklch(0.92 0.04 250 / 0.15) 0%, transparent 70%)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-default-600 mb-6 text-lg">
            {t('cta_question')}
          </p>
          <a
            href="/campaigns/create"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-600 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Icon icon="solar:add-circle-bold" width={24} />
            {t('cta_button')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
