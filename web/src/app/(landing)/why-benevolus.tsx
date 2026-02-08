'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const iconKeys = [
  'solar:shield-check-outline',
  'solar:hand-money-outline',
  'solar:users-group-rounded-outline',
] as const;

export function WhyBenevolus() {
  const t = useTranslations('home.why');

  return (
    <section className="relative w-full py-20">
      <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden border border-default-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/* Bloco esquerdo: visual forte e memorável */}
          <motion.div
            className="relative flex flex-col justify-center px-10 py-20 lg:py-24 lg:px-14 order-2 lg:order-1 overflow-hidden"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Gradiente sofisticado */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(160deg, oklch(0.45 0.15 250) 0%, oklch(0.38 0.13 245) 100%)',
              }}
            />
            {/* Formas geométricas sutis */}
            <div
              className="absolute top-1/4 -right-12 w-48 h-48 rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, oklch(0.6 0.12 260), transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            <div
              className="absolute bottom-1/4 -left-8 w-32 h-32 rounded-full opacity-15"
              style={{
                background: 'radial-gradient(circle, oklch(0.55 0.1 255), transparent 70%)',
                filter: 'blur(30px)',
              }}
            />
            {/* Padrão sutil */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20.5v-1h-1v1h1zM0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px',
              }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-6">
                <Icon icon="solar:star-outline" width={16} height={16} className="text-white" />
                <span className="text-white/90 text-xs font-semibold uppercase tracking-wider">Diferenciais</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-5">
                {t('title')}
              </h2>
              <p className="text-white/85 text-xl max-w-md leading-relaxed font-light">
                {t('subtitle')}
              </p>
            </div>
          </motion.div>

          {/* Bloco direito: itens como cards sutis */}
          <div className="relative flex flex-col justify-center px-8 py-16 lg:py-20 lg:px-12 bg-white dark:bg-default-50 order-1 lg:order-2">
            <div className="space-y-5">
              {([0, 1, 2] as const).map((index) => (
                <motion.div
                  key={index}
                  className="group flex gap-5 p-5 rounded-2xl bg-default-50/50 dark:bg-default-100/30 border border-transparent transition-all duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary transition-all">
                    <Icon icon={iconKeys[index]} width={28} height={28} />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className="text-lg font-semibold text-foreground mb-1 tracking-tight">
                      {t(`item_${index}_title`)}
                    </h3>
                    <p className="text-default-500 leading-relaxed text-[15px]">
                      {t(`item_${index}_description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
