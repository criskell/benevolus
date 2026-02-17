'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PrivacyPage = () => {
  const t = useTranslations('privacy');

  const sections = [
    {
      icon: 'solar:info-circle-bold-duotone',
      title: t('sections.introduction.title'),
      content: t('sections.introduction.content'),
    },
    {
      icon: 'solar:database-bold-duotone',
      title: t('sections.data_collection.title'),
      content: t('sections.data_collection.content'),
    },
    {
      icon: 'solar:chart-bold-duotone',
      title: t('sections.data_usage.title'),
      content: t('sections.data_usage.content'),
    },
    {
      icon: 'solar:share-bold-duotone',
      title: t('sections.data_sharing.title'),
      content: t('sections.data_sharing.content'),
    },
    {
      icon: 'solar:shield-check-bold-duotone',
      title: t('sections.data_security.title'),
      content: t('sections.data_security.content'),
    },
    {
      icon: 'solar:cookie-bold-duotone',
      title: t('sections.cookies.title'),
      content: t('sections.cookies.content'),
    },
    {
      icon: 'solar:hand-stars-bold-duotone',
      title: t('sections.user_rights.title'),
      content: t('sections.user_rights.content'),
    },
    {
      icon: 'solar:baby-bold-duotone',
      title: t('sections.minors.title'),
      content: t('sections.minors.content'),
    },
    {
      icon: 'solar:global-bold-duotone',
      title: t('sections.international.title'),
      content: t('sections.international.content'),
    },
    {
      icon: 'solar:refresh-bold-duotone',
      title: t('sections.changes.title'),
      content: t('sections.changes.content'),
    },
  ];

  const highlights = [
    {
      icon: 'solar:shield-user-bold-duotone',
      title: t('highlights.security.title'),
      description: t('highlights.security.description'),
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: 'solar:eye-bold-duotone',
      title: t('highlights.transparency.title'),
      description: t('highlights.transparency.description'),
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: 'solar:star-bold-duotone',
      title: t('highlights.control.title'),
      description: t('highlights.control.description'),
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-background via-default-50/30 to-background">
      {/* Hero Section */}
      <section className="relative min-h-[35vh] flex flex-col items-center justify-center px-6 pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-200/20 via-transparent to-transparent" />
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
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-100/70 via-emerald-50/50 to-emerald-100/70 text-emerald-900 px-6 py-2.5 text-sm font-bold mb-8 border-2 border-emerald-300/50 backdrop-blur-sm"
          >
            <Icon icon="solar:shield-bold-duotone" className="size-5 text-emerald-600" />
            {t('hero_badge')}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl md:leading-[1.1] mb-6"
          >
            <span className="bg-gradient-to-r from-emerald-900 via-emerald-600 to-emerald-900 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
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

      {/* LGPD Badge */}
      <section className="relative px-6 pb-12">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="border-2 border-emerald-300/50 bg-gradient-to-br from-emerald-50/60 via-emerald-100/30 to-emerald-50/40 shadow-none">
              <CardBody className="p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Icon icon="solar:verified-check-bold" width={32} className="text-emerald-600" />
                  <Chip
                    size="lg"
                    className="bg-emerald-600 text-white font-bold px-4"
                  >
                    LGPD
                  </Chip>
                </div>
                <p className="text-default-700 leading-relaxed text-lg">
                  {t('lgpd_compliance')}
                </p>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative px-6 pb-12">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              >
                <Card className="border-2 border-emerald-200/40 hover:border-emerald-400/60 transition-all duration-300 shadow-none h-full">
                  <CardBody className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${highlight.color} flex items-center justify-center mx-auto mb-4`}>
                      <Icon icon={highlight.icon} width={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-sm text-default-600">
                      {highlight.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="relative px-6 pb-16">
        <div className="container max-w-4xl mx-auto space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.05, duration: 0.5 }}
            >
              <Card className="border-2 border-emerald-200/40 shadow-none">
                <CardBody className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
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
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <Card className="border-2 border-emerald-300/50 overflow-hidden relative bg-gradient-to-br from-emerald-50/60 via-emerald-100/30 to-emerald-50/40 shadow-none">
              <CardBody className="p-8 text-center">
                <Icon icon="solar:letter-opened-bold-duotone" width={48} className="text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {t('contact.title')}
                </h3>
                <p className="text-default-600 mb-6 max-w-2xl mx-auto">
                  {t('contact.description')}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold transition-all duration-300 hover:scale-105"
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
};

export default PrivacyPage;
