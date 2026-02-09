'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody, Input, Textarea, Button, Chip } from '@heroui/react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactMethods = [
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
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-background via-default-50/30 to-background">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center px-6 pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-300/20 via-transparent to-transparent" />
          
          {/* Floating particles */}
          <div className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-blue-400/40 animate-float" />
          <div className="absolute top-40 right-[15%] w-3 h-3 rounded-full bg-blue-500/40 animate-float-delayed" />
          <div className="absolute bottom-32 left-[20%] w-2 h-2 rounded-full bg-blue-400/40 animate-float" />
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
            <Icon icon="solar:chat-round-dots-bold-duotone" className="size-5 text-blue-600" />
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
            className="mt-6 text-lg text-default-600 max-w-3xl mx-auto sm:text-xl leading-relaxed font-medium"
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Methods */}
      <section className="relative px-6 pb-12">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
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

      {/* Contact Form */}
      <section className="relative px-6 pb-16">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Card className="border-2 border-blue-200/40 shadow-none">
              <CardBody className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-foreground mb-3">
                    {t('form.title')}
                  </h2>
                  <p className="text-default-600">
                    {t('form.subtitle')}
                  </p>
                </div>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 rounded-xl bg-emerald-50 border-2 border-emerald-200 flex items-center gap-3"
                  >
                    <Icon icon="solar:check-circle-bold" width={24} className="text-emerald-600" />
                    <p className="text-emerald-700 font-medium">
                      {t('form.success_message')}
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label={t('form.name_label')}
                      placeholder={t('form.name_placeholder')}
                      value={formData.name}
                      onValueChange={(value) => setFormData({ ...formData, name: value })}
                      required
                      size="lg"
                      classNames={{
                        input: "text-base",
                        inputWrapper: "border-2 border-blue-200 hover:border-blue-400 group-data-[focus=true]:border-blue-500"
                      }}
                    />
                    <Input
                      label={t('form.email_label')}
                      placeholder={t('form.email_placeholder')}
                      type="email"
                      value={formData.email}
                      onValueChange={(value) => setFormData({ ...formData, email: value })}
                      required
                      size="lg"
                      classNames={{
                        input: "text-base",
                        inputWrapper: "border-2 border-blue-200 hover:border-blue-400 group-data-[focus=true]:border-blue-500"
                      }}
                    />
                  </div>

                  <Input
                    label={t('form.subject_label')}
                    placeholder={t('form.subject_placeholder')}
                    value={formData.subject}
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                    required
                    size="lg"
                    classNames={{
                      input: "text-base",
                      inputWrapper: "border-2 border-blue-200 hover:border-blue-400 group-data-[focus=true]:border-blue-500"
                    }}
                  />

                  <Textarea
                    label={t('form.message_label')}
                    placeholder={t('form.message_placeholder')}
                    value={formData.message}
                    onValueChange={(value) => setFormData({ ...formData, message: value })}
                    required
                    minRows={6}
                    classNames={{
                      input: "text-base",
                      inputWrapper: "border-2 border-blue-200 hover:border-blue-400 group-data-[focus=true]:border-blue-500"
                    }}
                  />

                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    className="w-full font-bold text-base"
                    isLoading={isSubmitting}
                    startContent={!isSubmitting && <Icon icon="solar:letter-opened-bold" width={24} />}
                  >
                    {isSubmitting ? t('form.sending') : t('form.submit')}
                  </Button>
                </form>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
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
    </main>
  );
}
