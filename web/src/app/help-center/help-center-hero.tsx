'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Input } from '@heroui/react';
import { motion } from 'framer-motion';

const HelpCenterHero = () => {
  const t = useTranslations('help_center');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative min-h-[45vh] flex flex-col items-center justify-center px-6 pt-24 pb-28 md:pt-32 md:pb-36 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-300/20 via-transparent to-transparent" />

        {/* Floating particles */}
        <div className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-indigo-400/40 animate-float" />
        <div className="absolute top-40 right-[15%] w-3 h-3 rounded-full bg-indigo-500/40 animate-float-delayed" />
        <div className="absolute bottom-32 left-[20%] w-2 h-2 rounded-full bg-indigo-400/40 animate-float" />
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
          className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-100/70 via-indigo-50/50 to-indigo-100/70 text-indigo-900 px-6 py-2.5 text-sm font-bold mb-8 border-2 border-indigo-300/50 backdrop-blur-sm"
        >
          <Icon icon="solar:book-bold-duotone" className="size-5 text-indigo-600" />
          {t('hero_badge')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl md:leading-[1.1] mb-6"
        >
          <span className="bg-gradient-to-r from-indigo-900 via-indigo-600 to-indigo-900 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
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

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <Input
            placeholder={t('search_placeholder')}
            startContent={<Icon icon="solar:magnifer-linear" className="size-5 text-default-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="lg"
            radius="full"
            classNames={{
              input: "text-base",
              inputWrapper: "border-2 border-indigo-200 hover:border-indigo-400 group-data-[focus=true]:border-indigo-500"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export { HelpCenterHero };
