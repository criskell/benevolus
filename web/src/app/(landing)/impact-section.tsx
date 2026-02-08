'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const statKeys = [
  {
    icon: 'solar:hand-money-bold-duotone',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    bgGlow: 'oklch(0.75 0.15 166)',
  },
  {
    icon: 'solar:users-group-rounded-bold-duotone',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    bgGlow: 'oklch(0.65 0.20 260)',
  },
  {
    icon: 'solar:heart-bold-duotone',
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    bgGlow: 'oklch(0.70 0.20 350)',
  },
] as const;

export function ImpactSection() {
  const t = useTranslations('home.impact');

  const stats = [
    { value: t('stat_0_value'), label: t('stat_0_label') },
    { value: t('stat_1_value'), label: t('stat_1_label') },
    { value: t('stat_2_value'), label: t('stat_2_label') },
  ];

  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden">
      {/* Background Container */}
      <div className="relative rounded-[2.5rem] -mx-4 md:mx-0 overflow-hidden">
        {/* Gradient Background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, oklch(0.97 0.02 250) 0%, oklch(0.95 0.04 240) 50%, oklch(0.96 0.03 220) 100%)',
          }}
        />

        {/* Decorative Blobs */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, oklch(0.70 0.20 250) 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, oklch(0.75 0.15 166) 0%, transparent 70%)',
          }}
        />

        {/* Noise Texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative px-6 md:px-16 py-16 md:py-20">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Icon icon="solar:chart-2-bold" width={20} />
              <span>{t('badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
              {t('title')}
            </h2>
            <p className="text-default-600 text-lg md:text-xl max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.2 + index * 0.15, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {/* Card */}
                <div className="relative flex flex-col items-center text-center p-8 rounded-3xl bg-white/70 dark:bg-default-50/50 backdrop-blur-sm border border-white/50 dark:border-default-200/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  {/* Glow Effect on Hover */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${statKeys[index].bgGlow} 0%, transparent 60%)`,
                    }}
                  />

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    {/* Animated gradient ring */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${statKeys[index].gradient} blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300 animate-pulse`} />
                    
                    <div className={`relative p-5 rounded-2xl bg-gradient-to-br ${statKeys[index].gradient} shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon 
                        icon={statKeys[index].icon} 
                        width={48} 
                        height={48}
                        className="text-white"
                      />
                    </div>
                  </div>

                  {/* Value */}
                  <div className="mb-3">
                    <span className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                  </div>

                  {/* Label */}
                  <span className="text-default-700 dark:text-default-600 font-semibold text-base md:text-lg max-w-[180px] leading-snug">
                    {stat.label}
                  </span>

                  {/* Decorative corner accent */}
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-br from-primary to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-gradient-to-br from-primary to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom decorative element */}
          <motion.div 
            className="flex justify-center mt-12 gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-2 h-2 rounded-full bg-primary/30"
                style={{
                  animation: `pulse 2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
