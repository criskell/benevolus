'use client';

import { Accordion, AccordionItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const faqCount = 4;

export function FaqSection() {
  const t = useTranslations('home.faq');

  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Fundo decorativo suave */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.96 0.02 250 / 0.6), transparent)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 ring-4 ring-primary/5">
            <Icon icon="solar:question-circle-outline" width={32} height={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-default-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Grid de perguntas (accordion estilizado como cards) */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Accordion
            variant="light"
            selectionMode="multiple"
            className="gap-4"
            itemClasses={{
              base: 'rounded-2xl border border-default-200 bg-white dark:bg-default-50',
              title: 'text-foreground font-semibold text-lg md:text-xl',
              trigger:
                'py-6 md:py-7 px-6 md:px-8 data-[hover=true]:opacity-100',
              content:
                'text-default-500 text-base pt-0 pb-6 md:pb-7 px-6 md:px-8 leading-relaxed',
            }}
          >
            {Array.from({ length: faqCount }, (_, i) => (
              <AccordionItem
                key={i}
                aria-label={t(`q_${i}`)}
                title={t(`q_${i}`)}
                classNames={{
                  base: 'group hover:border-primary/30 transition-colors',
                  indicator: 'text-default-400 [&>svg]:w-6 [&>svg]:h-6',
                }}
              >
                {t(`a_${i}`)}
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
