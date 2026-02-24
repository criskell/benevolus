'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';

const ContactMethods = () => {
  const t = useTranslations('contact');

  const methods = [
    {
      icon: 'solar:letter-bold-duotone',
      title: t('methods.email.title'),
      description: t('methods.email.description'),
      value: 'contato@benevolus.com',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: 'solar:phone-bold-duotone',
      title: t('methods.phone.title'),
      description: t('methods.phone.description'),
      value: '+55 (11) 1234-5678',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: 'solar:chat-round-dots-bold-duotone',
      title: t('methods.social.title'),
      description: t('methods.social.description'),
      value: '@benevolus',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section className="relative px-6 pb-12">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {methods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            >
              <Card className="border-2 border-blue-200/40 hover:border-blue-400/60 transition-all duration-300 hover:scale-105 shadow-none h-full">
                <CardBody className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon icon={method.icon} width={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-default-600 mb-3">
                    {method.description}
                  </p>
                  <p className="text-base font-semibold text-blue-600">
                    {method.value}
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

export { ContactMethods };
