'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Card, CardBody, Input, Textarea, Button } from '@heroui/react';
import { motion } from 'framer-motion';

const ContactForm = () => {
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

  return (
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
  );
};

export { ContactForm };
