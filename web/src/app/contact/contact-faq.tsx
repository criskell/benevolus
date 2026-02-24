'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';

const ContactFaq = () => {
  const t = useTranslations('contact');

  const faqs = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1'),
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2'),
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3'),
    },
  ];

  return (
    <section className="relative px-6 pb-24">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-black text-foreground mb-3">
            {t('faq.title')}
          </h2>
          <p className="text-default-600">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
            >
              <Card className="border-2 border-blue-200/40 shadow-none">
                <CardBody className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-start gap-3">
                    <Icon icon="solar:question-circle-bold" width={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-default-600 leading-relaxed pl-9">
                    {faq.answer}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ContactFaq };
