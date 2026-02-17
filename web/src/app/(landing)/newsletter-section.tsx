'use client';

import { useState } from 'react';
import { Button, Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export const NewsletterSection = () => {
  const t = useTranslations('home.newsletter');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="relative w-full py-20 overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          className="relative flex flex-col md:flex-row md:items-center gap-10 md:gap-14 p-8 md:p-12 rounded-[2rem] border border-default-200 bg-white dark:bg-default-50/80"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Forma decorativa */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ background: 'oklch(0.84 0.18 117.33)' }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-15 blur-3xl"
            style={{ background: 'oklch(0.7 0.15 250)' }}
          />

          {/* Lado esquerdo: texto + ícone */}
          <div className="md:flex-1 relative">
            <div className="inline-flex rounded-2xl bg-primary/10 p-4 text-primary mb-6">
              <Icon icon="solar:letter-outline" width={40} height={40} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
              {t('title')}
            </h2>
            <p className="text-default-500 text-lg leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Lado direito: formulário */}
          <div className="md:w-[380px] shrink-0 relative">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder={t('placeholder')}
                value={email}
                onValueChange={setEmail}
                isInvalid={status === 'error'}
                className="flex-1"
                radius="full"
                size="lg"
                autoComplete="email"
                classNames={{
                  input: 'text-base',
                  inputWrapper: 'border border-default-200 bg-default-50/50',
                }}
              />
              <Button
                type="submit"
                color="primary"
                radius="full"
                size="lg"
                className="font-semibold"
              >
                {t('button')}
              </Button>
            </form>
            {status === 'success' && (
              <motion.p
                className="mt-3 text-primary text-sm font-medium"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t('success')}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
