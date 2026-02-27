'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HelpCenterQuickLinks = () => {
  const t = useTranslations('help_center');

  const quickLinks = [
    {
      title: t('quick_links.contact'),
      description: t('quick_links.contact_desc'),
      icon: 'solar:letter-bold-duotone',
      link: '/contact',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: t('quick_links.faq'),
      description: t('quick_links.faq_desc'),
      icon: 'solar:question-square-bold-duotone',
      link: '/faq',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: t('quick_links.status'),
      description: t('quick_links.status_desc'),
      icon: 'solar:chart-bold-duotone',
      link: '#',
      color: 'from-emerald-500 to-emerald-600',
    },
  ];

  return (
    <section className="relative px-6 pb-24">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-black text-foreground mb-3">
            {t('need_more_help')}
          </h2>
          <p className="text-default-600">
            {t('more_help_description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
            >
              <Link href={link.link}>
                <Card className="border-2 border-indigo-200/40 hover:border-indigo-400/60 transition-all duration-300 hover:scale-105 shadow-none h-full cursor-pointer">
                  <CardBody className="p-8 text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center mx-auto mb-4`}>
                      <Icon icon={link.icon} width={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {link.title}
                    </h3>
                    <p className="text-sm text-default-600">
                      {link.description}
                    </p>
                  </CardBody>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { HelpCenterQuickLinks };
