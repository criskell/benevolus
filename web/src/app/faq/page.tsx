'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody, Input, Accordion, AccordionItem, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const FAQPage = () => {
  const t = useTranslations('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: t('categories.all'), icon: 'solar:widget-bold-duotone' },
    { id: 'donations', label: t('categories.donations'), icon: 'solar:heart-bold-duotone' },
    { id: 'campaigns', label: t('categories.campaigns'), icon: 'solar:hand-heart-bold-duotone' },
    { id: 'payments', label: t('categories.payments'), icon: 'solar:wallet-bold-duotone' },
    { id: 'account', label: t('categories.account'), icon: 'solar:user-bold-duotone' },
    { id: 'security', label: t('categories.security'), icon: 'solar:shield-check-bold-duotone' },
  ];

  const faqs = [
    { category: 'donations', question: t('questions.donations.q1'), answer: t('questions.donations.a1') },
    { category: 'donations', question: t('questions.donations.q2'), answer: t('questions.donations.a2') },
    { category: 'donations', question: t('questions.donations.q3'), answer: t('questions.donations.a3') },
    { category: 'donations', question: t('questions.donations.q4'), answer: t('questions.donations.a4') },
    { category: 'campaigns', question: t('questions.campaigns.q1'), answer: t('questions.campaigns.a1') },
    { category: 'campaigns', question: t('questions.campaigns.q2'), answer: t('questions.campaigns.a2') },
    { category: 'campaigns', question: t('questions.campaigns.q3'), answer: t('questions.campaigns.a3') },
    { category: 'campaigns', question: t('questions.campaigns.q4'), answer: t('questions.campaigns.a4') },
    { category: 'payments', question: t('questions.payments.q1'), answer: t('questions.payments.a1') },
    { category: 'payments', question: t('questions.payments.q2'), answer: t('questions.payments.a2') },
    { category: 'payments', question: t('questions.payments.q3'), answer: t('questions.payments.a3') },
    { category: 'account', question: t('questions.account.q1'), answer: t('questions.account.a1') },
    { category: 'account', question: t('questions.account.q2'), answer: t('questions.account.a2') },
    { category: 'account', question: t('questions.account.q3'), answer: t('questions.account.a3') },
    { category: 'security', question: t('questions.security.q1'), answer: t('questions.security.a1') },
    { category: 'security', question: t('questions.security.q2'), answer: t('questions.security.a2') },
    { category: 'security', question: t('questions.security.q3'), answer: t('questions.security.a3') },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-background via-default-50/30 to-background">
      {/* Hero Section */}
      <section className="relative min-h-[45vh] flex flex-col items-center justify-center px-6 pt-24 pb-28 md:pt-32 md:pb-36 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200/20 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-300/20 via-transparent to-transparent" />
          
          {/* Floating particles */}
          <div className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-purple-400/40 animate-float" />
          <div className="absolute top-40 right-[15%] w-3 h-3 rounded-full bg-purple-500/40 animate-float-delayed" />
          <div className="absolute bottom-32 left-[20%] w-2 h-2 rounded-full bg-purple-400/40 animate-float" />
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
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-purple-100/70 via-purple-50/50 to-purple-100/70 text-purple-900 px-6 py-2.5 text-sm font-bold mb-8 border-2 border-purple-300/50 backdrop-blur-sm"
          >
            <Icon icon="solar:question-circle-bold-duotone" className="size-5 text-purple-600" />
            {t('hero_badge')}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl md:leading-[1.1] mb-6"
          >
            <span className="bg-gradient-to-r from-purple-900 via-purple-600 to-purple-900 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
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
                inputWrapper: "border-2 border-purple-200 hover:border-purple-400 group-data-[focus=true]:border-purple-500"
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Filter */}
      <section className="relative px-6 pb-12">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2
                  ${selectedCategory === category.id 
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white scale-105 shadow-lg' 
                    : 'bg-white border-2 border-purple-200 text-default-700 hover:border-purple-400 hover:scale-105'}
                `}
              >
                <Icon icon={category.icon} width={20} />
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs List */}
      <section className="relative px-6 pb-24">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {filteredFaqs.length === 0 ? (
              <Card className="border-2 border-purple-200/40 shadow-none">
                <CardBody className="p-12 text-center">
                  <Icon icon="solar:magnifer-bug-bold-duotone" width={64} className="text-purple-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {t('no_results_title')}
                  </h3>
                  <p className="text-default-600">
                    {t('no_results_description')}
                  </p>
                </CardBody>
              </Card>
            ) : (
              <Accordion
                variant="splitted"
                className="gap-4"
                itemClasses={{
                  base: "border-2 border-purple-200/40 shadow-none rounded-2xl px-6 hover:border-purple-400/60 transition-all",
                  title: "text-lg font-bold text-foreground",
                  trigger: "py-6",
                  content: "text-default-700 leading-relaxed pb-6",
                }}
              >
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    aria-label={faq.question}
                    title={faq.question}
                    startContent={
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                          <Icon icon="solar:question-circle-bold" width={20} className="text-white" />
                        </div>
                      </div>
                    }
                  >
                    {faq.answer}
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-default-600 mb-2">
              {t('showing_results', { count: filteredFaqs.length, total: faqs.length })}
            </p>
          </motion.div>
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
            <Card className="border-2 border-purple-300/50 overflow-hidden relative bg-gradient-to-br from-purple-50/60 via-purple-100/30 to-purple-50/40 shadow-none">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent" />
              <CardBody className="p-8 md:p-12 text-center relative">
                <Icon icon="solar:chat-round-dots-bold-duotone" width={48} className="text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {t('still_have_questions')}
                </h3>
                <p className="text-default-600 mb-6 max-w-2xl mx-auto">
                  {t('contact_description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Icon icon="solar:letter-bold" width={24} />
                    {t('contact_button')}
                  </Link>
                  <Link
                    href="/help-center"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-purple-500 hover:border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Icon icon="solar:book-bold" width={24} />
                    {t('help_center_button')}
                  </Link>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default FAQPage;
