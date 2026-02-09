'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsPage() {
  const t = useTranslations('terms');

  const sections = [
    {
      icon: 'solar:document-text-bold-duotone',
      title: t('sections.acceptance.title'),
      content: t('sections.acceptance.content'),
    },
    {
      icon: 'solar:user-id-bold-duotone',
      title: t('sections.registration.title'),
      content: t('sections.registration.content'),
    },
    {
      icon: 'solar:hand-heart-bold-duotone',
      title: t('sections.campaigns.title'),
      content: t('sections.campaigns.content'),
    },
    {
      icon: 'solar:wallet-bold-duotone',
      title: t('sections.donations.title'),
      content: t('sections.donations.content'),
    },
    {
      icon: 'solar:shield-check-bold-duotone',
      title: t('sections.responsibilities.title'),
      content: t('sections.responsibilities.content'),
    },
    {
      icon: 'solar:copyright-bold-duotone',
      title: t('sections.intellectual_property.title'),
      content: t('sections.intellectual_property.content'),
    },
    {
      icon: 'solar:forbidden-circle-bold-duotone',
      title: t('sections.prohibited_conduct.title'),
      content: t('sections.prohibited_conduct.content'),
    },
    {
      icon: 'solar:close-circle-bold-duotone',
      title: t('sections.termination.title'),
      content: t('sections.termination.content'),
    },
    {
      icon: 'solar:pen-bold-duotone',
      title: t('sections.modifications.title'),
      content: t('sections.modifications.content'),
    },
    {
      icon: 'solar:scale-bold-duotone',
      title: t('sections.law.title'),
      content: t('sections.law.content'),
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-background via-default-50/30 to-background">
      {/* Hero Section */}
      <section className="relative min-h-[35vh] flex flex-col items-center justify-center px-6 pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent" />
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
            <Icon icon="solar:document-bold-duotone" className="size-5 text-blue-600" />
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
            className="mt-4 text-base text-default-600 max-w-2xl mx-auto"
          >
            {t('last_updated')}: {t('last_updated_date')}
          </motion.p>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="relative px-6 pb-8">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="border-2 border-blue-300/50 bg-gradient-to-br from-blue-50/60 via-blue-100/30 to-blue-50/40 shadow-none">
              <CardBody className="p-8">
                <p className="text-default-700 leading-relaxed text-lg">
                  {t('introduction')}
                </p>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="relative px-6 pb-16">
        <div className="container max-w-4xl mx-auto space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.05, duration: 0.5 }}
            >
              <Card className="border-2 border-blue-200/40 shadow-none">
                <CardBody className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Icon icon={section.icon} width={24} className="text-white" />
                    </div>
                    <span>{index + 1}. {section.title}</span>
                  </h2>
                  <div className="pl-15">
                    <p className="text-default-700 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative px-6 pb-24">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Card className="border-2 border-blue-300/50 overflow-hidden relative bg-gradient-to-br from-blue-50/60 via-blue-100/30 to-blue-50/40 shadow-none">
              <CardBody className="p-8 text-center">
                <Icon icon="solar:chat-round-dots-bold-duotone" width={48} className="text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {t('contact.title')}
                </h3>
                <p className="text-default-600 mb-6 max-w-2xl mx-auto">
                  {t('contact.description')}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Icon icon="solar:letter-bold" width={24} />
                  {t('contact.button')}
                </Link>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
