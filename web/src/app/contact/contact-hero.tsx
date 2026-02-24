'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const ContactHero = () => {
  const t = useTranslations('contact');

  return (
    <section className="relative min-h-[40vh] flex flex-col items-center justify-center px-6 pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-300/20 via-transparent to-transparent" />

        {/* Floating particles */}
        <div className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-blue-400/40 animate-float" />
        <div className="absolute top-40 right-[15%] w-3 h-3 rounded-full bg-blue-500/40 animate-float-delayed" />
        <div className="absolute bottom-32 left-[20%] w-2 h-2 rounded-full bg-blue-400/40 animate-float" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container max-w-5xl mx-auto text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-100/70 via-blue-50/50 to-blue-100/70 text-blue-900 px-6 py-2.5 text-sm font-bold mb-8 border-2 border-blue-300/50 backdrop-blur-sm"
        >
          <Icon icon="solar:chat-round-dots-bold-duotone" className="size-5 text-blue-600" />
          {t('hero_badge')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl md:leading-[1.1] mb-6"
        >
          <span className="bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            {t('title')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 text-lg text-default-600 max-w-3xl mx-auto sm:text-xl leading-relaxed font-medium"
        >
          {t('subtitle')}
        </motion.p>
      </motion.div>
    </section>
  );
};

export { ContactHero };
