'use client';

import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  const t = useTranslations('home');

  return (
    <section className="relative z-20 flex flex-col items-center justify-center gap-8 py-16 md:py-24">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Button
          as={Link}
          href="/mission"
          className="group relative border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 text-primary h-10 overflow-hidden border px-5 py-2 font-medium transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
          endContent={
            <Icon
              className="transition-transform duration-300 group-hover:translate-x-1"
              icon="solar:arrow-right-linear"
              width={20}
            />
          }
          radius="full"
          variant="bordered"
        >
          <span className="relative z-10">{t('mission')}</span>
          {/* Shine effect on hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </Button>
      </motion.div>

      {/* Title */}
      <motion.div
        className="text-center max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h1 className="text-[clamp(48px,8vw,80px)] leading-[1.1] font-black tracking-tighter mb-6">
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-br from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
              {t('title_line_1')}
            </span>
            {/* Subtle glow behind first line */}
            <div 
              className="absolute inset-0 blur-2xl opacity-30 -z-10"
              style={{
                background: 'linear-gradient(90deg, oklch(0.70 0.25 250) 0%, oklch(0.75 0.20 280) 100%)',
              }}
            />
          </span>
          <br />
          <span className="relative inline-block bg-gradient-to-r from-primary via-primary-500 to-primary-600 bg-clip-text text-transparent">
            {t('title_line_2')}
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-default-600 text-center leading-relaxed text-lg md:text-xl max-w-2xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t('headline')}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link href="/campaigns">
          <Button 
            color="primary" 
            size="lg"
            radius="full"
            className="group relative font-semibold text-base px-8 h-14 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
            startContent={
              <Icon icon="solar:heart-bold" width={24} />
            }
          >
            {t('donate')}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </Link>
        
        <Link href="/campaigns/create">
          <Button
            size="lg"
            radius="full"
            variant="bordered"
            className="group border-2 border-default-200 bg-background/50 backdrop-blur-sm font-semibold text-base px-8 h-14 transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:scale-105"
            endContent={
              <span className="bg-default-100 group-hover:bg-primary/20 transition-colors duration-300 flex h-7 w-7 items-center justify-center rounded-full">
                <Icon
                  className="text-default-500 group-hover:text-primary transition-colors duration-300"
                  icon="solar:arrow-right-linear"
                  width={18}
                />
              </span>
            }
          >
            {t('create_campaign')}
          </Button>
        </Link>
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm text-default-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-600 border-2 border-background flex items-center justify-center text-white text-xs font-semibold"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span className="font-medium">{t('hero_trust_donors')}</span>
        </div>

        <div className="flex items-center gap-2">
          <Icon icon="solar:shield-check-bold" width={24} className="text-primary" />
          <span className="font-medium">{t('hero_trust_secure')}</span>
        </div>

        <div className="flex items-center gap-2">
          <Icon icon="solar:star-bold" width={24} className="text-amber-500" />
          <span className="font-medium">{t('hero_trust_rating')}</span>
        </div>
      </motion.div>

      {/* Floating elements decoration */}
      <motion.div
        className="absolute top-1/4 left-10 hidden lg:block"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center shadow-xl">
          <Icon icon="solar:heart-bold" width={32} className="text-primary" />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-10 hidden lg:block"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 backdrop-blur-sm border border-emerald-500/20 flex items-center justify-center shadow-xl">
          <Icon icon="solar:hand-heart-bold" width={32} className="text-emerald-500" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/4 hidden lg:block"
        animate={{ 
          y: [0, -15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/10 backdrop-blur-sm border border-pink-500/20 flex items-center justify-center shadow-lg">
          <Icon icon="solar:star-bold" width={24} className="text-pink-500" />
        </div>
      </motion.div>
    </section>
  );
}
