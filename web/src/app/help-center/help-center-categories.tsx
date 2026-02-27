'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HelpCenterCategories = () => {
  const t = useTranslations('help_center');

  const categories = [
    {
      id: 'getting-started',
      icon: 'solar:rocket-bold-duotone',
      title: t('categories.getting_started.title'),
      description: t('categories.getting_started.description'),
      articles: 5,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'donations',
      icon: 'solar:heart-bold-duotone',
      title: t('categories.donations.title'),
      description: t('categories.donations.description'),
      articles: 8,
      color: 'from-red-500 to-pink-600',
    },
    {
      id: 'campaigns',
      icon: 'solar:hand-heart-bold-duotone',
      title: t('categories.campaigns.title'),
      description: t('categories.campaigns.description'),
      articles: 12,
      color: 'from-emerald-500 to-green-600',
    },
    {
      id: 'payments',
      icon: 'solar:wallet-bold-duotone',
      title: t('categories.payments.title'),
      description: t('categories.payments.description'),
      articles: 6,
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 'account',
      icon: 'solar:user-bold-duotone',
      title: t('categories.account.title'),
      description: t('categories.account.description'),
      articles: 7,
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'security',
      icon: 'solar:shield-check-bold-duotone',
      title: t('categories.security.title'),
      description: t('categories.security.description'),
      articles: 4,
      color: 'from-cyan-500 to-blue-600',
    },
  ];

  return (
    <section className="relative px-6 pb-16">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-black text-foreground mb-3">
            {t('browse_by_category')}
          </h2>
          <p className="text-default-600">
            {t('category_description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            >
              <Link href={`/help-center/${category.id}`}>
                <Card className="border-2 border-indigo-200/40 hover:border-indigo-400/60 transition-all duration-300 hover:scale-105 shadow-none h-full cursor-pointer group">
                  <CardBody className="p-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon icon={category.icon} width={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-indigo-600 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-default-600 mb-3">
                      {category.description}
                    </p>
                    <p className="text-xs text-default-500 font-medium">
                      {category.articles} {t('articles')}
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

export { HelpCenterCategories };
