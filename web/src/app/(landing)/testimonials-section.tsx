'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const testimonialStyles = [
  {
    gradient: 'from-blue-500/10 via-indigo-500/10 to-purple-500/10',
    ringColor: 'ring-blue-500/20',
    avatarGradient: 'from-blue-500 to-indigo-600',
    iconColor: 'text-blue-500',
  },
  {
    gradient: 'from-emerald-500/10 via-teal-500/10 to-cyan-500/10',
    ringColor: 'ring-emerald-500/20',
    avatarGradient: 'from-emerald-500 to-teal-600',
    iconColor: 'text-emerald-500',
  },
  {
    gradient: 'from-rose-500/10 via-pink-500/10 to-fuchsia-500/10',
    ringColor: 'ring-rose-500/20',
    avatarGradient: 'from-rose-500 to-pink-600',
    iconColor: 'text-rose-500',
  },
];

export function TestimonialsSection() {
  const t = useTranslations('home.testimonials');

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, oklch(0.70 0.20 250) 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, oklch(0.75 0.15 330) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
          <Icon icon="solar:chat-round-like-bold" width={20} />
          <span>Depoimentos</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
          {t('title')}
        </h2>
        <p className="text-default-600 text-lg md:text-xl max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Featured Card (Large) */}
        <motion.div
          className="lg:row-span-2 group"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={`relative h-full flex flex-col p-8 md:p-10 rounded-3xl bg-gradient-to-br ${testimonialStyles[0].gradient} backdrop-blur-sm border border-default-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden`}>
            {/* Decorative quote background */}
            <div className="absolute top-6 right-6 opacity-5">
              <Icon icon="solar:quote-bold" width={120} height={120} />
            </div>

            {/* Stars Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Icon 
                  key={i}
                  icon="solar:star-bold" 
                  className={testimonialStyles[0].iconColor}
                  width={24} 
                  height={24}
                />
              ))}
            </div>

            {/* Quote Icon */}
            <div className="mb-6">
              <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${testimonialStyles[0].avatarGradient} shadow-lg`}>
                <Icon
                  icon="solar:quote-up-bold"
                  className="text-white"
                  width={32}
                  height={32}
                />
              </div>
            </div>

            {/* Testimonial Text */}
            <p className="text-foreground text-xl md:text-2xl leading-relaxed mb-8 flex-1 font-medium relative z-10">
              &ldquo;{t('quote_0')}&rdquo;
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-4 relative z-10">
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${testimonialStyles[0].avatarGradient} flex items-center justify-center shadow-lg ring-4 ${testimonialStyles[0].ringColor} transition-transform duration-300 group-hover:scale-110`}>
                <span className="text-white font-bold text-2xl">
                  {t('name_0').charAt(0)}
                </span>
              </div>
              <div>
                <span className="font-bold text-lg block text-foreground">
                  {t('name_0')}
                </span>
                <span className="text-default-600 text-sm flex items-center gap-1">
                  <Icon icon="solar:verified-check-bold" width={16} className="text-primary" />
                  {t('role_0')}
                </span>
              </div>
            </div>

            {/* Decorative corner gradient */}
            <div 
              className="absolute bottom-0 right-0 w-48 h-48 opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
              style={{
                background: `radial-gradient(circle, oklch(0.70 0.20 250) 0%, transparent 70%)`,
              }}
            />
          </div>
        </motion.div>

        {/* Second Card */}
        <motion.div
          className="group"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={`relative h-full flex flex-col p-7 rounded-3xl bg-gradient-to-br ${testimonialStyles[1].gradient} backdrop-blur-sm border border-default-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden`}>
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Icon 
                  key={i}
                  icon="solar:star-bold" 
                  className={testimonialStyles[1].iconColor}
                  width={20} 
                  height={20}
                />
              ))}
            </div>

            {/* Quote */}
            <p className="text-foreground text-base md:text-lg leading-relaxed mb-6 flex-1 relative z-10">
              &ldquo;{t('quote_1')}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 relative z-10">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${testimonialStyles[1].avatarGradient} flex items-center justify-center shadow-md ring-2 ${testimonialStyles[1].ringColor} transition-transform duration-300 group-hover:scale-110`}>
                <span className="text-white font-bold text-lg">
                  {t('name_1').charAt(0)}
                </span>
              </div>
              <div>
                <span className="font-semibold block text-foreground">
                  {t('name_1')}
                </span>
                <span className="text-default-600 text-xs flex items-center gap-1">
                  <Icon icon="solar:verified-check-bold" width={14} className="text-primary" />
                  {t('role_1')}
                </span>
              </div>
            </div>

            {/* Background quote */}
            <div className="absolute bottom-4 right-4 opacity-5">
              <Icon icon="solar:quote-bold" width={80} height={80} />
            </div>
          </div>
        </motion.div>

        {/* Third Card */}
        <motion.div
          className="group"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={`relative h-full flex flex-col p-7 rounded-3xl bg-gradient-to-br ${testimonialStyles[2].gradient} backdrop-blur-sm border border-default-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden`}>
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Icon 
                  key={i}
                  icon="solar:star-bold" 
                  className={testimonialStyles[2].iconColor}
                  width={20} 
                  height={20}
                />
              ))}
            </div>

            {/* Quote */}
            <p className="text-foreground text-base md:text-lg leading-relaxed mb-6 flex-1 relative z-10">
              &ldquo;{t('quote_2')}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 relative z-10">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${testimonialStyles[2].avatarGradient} flex items-center justify-center shadow-md ring-2 ${testimonialStyles[2].ringColor} transition-transform duration-300 group-hover:scale-110`}>
                <span className="text-white font-bold text-lg">
                  {t('name_2').charAt(0)}
                </span>
              </div>
              <div>
                <span className="font-semibold block text-foreground">
                  {t('name_2')}
                </span>
                <span className="text-default-600 text-xs flex items-center gap-1">
                  <Icon icon="solar:verified-check-bold" width={14} className="text-primary" />
                  {t('role_2')}
                </span>
              </div>
            </div>

            {/* Background quote */}
            <div className="absolute bottom-4 right-4 opacity-5">
              <Icon icon="solar:quote-bold" width={80} height={80} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trust indicator */}
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-default-500 text-sm flex items-center justify-center gap-2">
          <Icon icon="solar:shield-check-bold" width={20} className="text-primary" />
          <span>Mais de 1.000 histórias de sucesso compartilhadas</span>
        </p>
      </motion.div>
    </section>
  );
}
