'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HelpCenterPopular = () => {
  const t = useTranslations('help_center');

  const popularArticles = [
    { title: t('popular.article_1'), icon: 'solar:question-circle-bold-duotone', link: '/faq' },
    { title: t('popular.article_2'), icon: 'solar:hand-money-bold-duotone', link: '/faq' },
    { title: t('popular.article_3'), icon: 'solar:document-add-bold-duotone', link: '/campaigns/create' },
    { title: t('popular.article_4'), icon: 'solar:shield-user-bold-duotone', link: '/faq' },
    { title: t('popular.article_5'), icon: 'solar:card-bold-duotone', link: '/faq' },
  ];

  return (
    <section className="relative px-6 pb-16">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-black text-foreground mb-3">
            {t('popular_articles')}
          </h2>
          <p className="text-default-600">
            {t('popular_description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {popularArticles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.05, duration: 0.5 }}
            >
              <Link href={article.link}>
                <Card className="border-2 border-indigo-200/40 hover:border-indigo-400/60 transition-all duration-300 hover:scale-105 shadow-none h-full cursor-pointer">
                  <CardBody className="p-4 flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                      <Icon icon={article.icon} width={24} className="text-white" />
                    </div>
                    <p className="text-sm font-semibold text-foreground line-clamp-2">
                      {article.title}
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

export { HelpCenterPopular };
