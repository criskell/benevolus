'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody, CardHeader, Input, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HelpCenterPage = () => {
  const t = useTranslations('help_center');
  const [searchQuery, setSearchQuery] = useState('');

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

  const popularArticles = [
    { title: t('popular.article_1'), icon: 'solar:question-circle-bold-duotone', link: '/faq' },
    { title: t('popular.article_2'), icon: 'solar:hand-money-bold-duotone', link: '/faq' },
    { title: t('popular.article_3'), icon: 'solar:document-add-bold-duotone', link: '/campaigns/create' },
    { title: t('popular.article_4'), icon: 'solar:shield-user-bold-duotone', link: '/faq' },
    { title: t('popular.article_5'), icon: 'solar:card-bold-duotone', link: '/faq' },
  ];

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
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-background via-default-50/30 to-background">
      {/* Hero Section */}
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

      {/* Categories Grid */}
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

      {/* Popular Articles */}
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

      {/* Quick Links */}
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
    </main>
  );
};

export default HelpCenterPage;
