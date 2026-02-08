'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Button } from '@heroui/react';

export default function MissionPage() {
  const t = useTranslations('aboutUs');

  const goals = [
    { icon: 'solar:global-outline', key: 'goal_platform' },
    { icon: 'solar:cpu-bolt-outline', key: 'goal_ai' },
    { icon: 'solar:wallet-money-outline', key: 'goal_zero_fees' },
    { icon: 'solar:heart-outline', key: 'goal_no_profit' },
    { icon: 'solar:hand-stars-outline', key: 'goal_tools' },
    { icon: 'solar:document-text-outline', key: 'goal_transparent' },
    { icon: 'solar:shield-user-outline', key: 'goal_responsibility' },
    { icon: 'solar:users-group-two-rounded-outline', key: 'goal_community' },
    { icon: 'solar:chat-round-dots-outline', key: 'goal_feedback' },
  ] as const;

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero — Missão e Valores */}
      <section className="min-h-[42vh] flex flex-col items-center justify-center px-6 pt-20 pb-24 md:min-h-[48vh] md:pt-24 md:pb-32">
        <div className="container max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary px-4 py-1.5 text-sm font-medium mb-6 border border-primary/20">
            <Icon icon="solar:heart-bold" className="size-4" />
            {t('hero_badge')}
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.1]">
            {t('title')}
          </h1>
          <p className="mt-5 text-lg text-default-600 max-w-2xl mx-auto sm:text-xl">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Mission — card style */}
      <section className="relative px-6 -mt-8 md:-mt-12 mb-16 md:mb-20">
        <div className="container max-w-4xl mx-auto">
          <article className="relative rounded-3xl bg-background border border-divider/60 shadow-xl shadow-default-200/20 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-primary-400 to-primary" aria-hidden />
            <div className="p-8 md:p-12 lg:p-14">
              <div className="flex flex-col items-center gap-5 mb-10">
                <div className="rounded-2xl bg-primary/15 p-5 ring-2 ring-primary/20">
                  <Icon icon="solar:heart-bold" className="text-primary size-12" />
                </div>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  {t('mission_title')}
                </h2>
              </div>
              <div className="space-y-6 text-default-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center md:text-left">
                <p>{t('mission_1')}</p>
                <p>{t('mission_2')}</p>
                <p className="font-semibold text-foreground">{t('mission_3')}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Goals — grid with style */}
      <section className="px-6 py-20 md:py-28 bg-default-100/50 border-t border-divider/50">
        <div className="container max-w-5xl mx-auto">
          <header className="flex flex-col items-center gap-4 mb-14 text-center">
            <div className="rounded-2xl bg-primary/15 p-4 ring-2 ring-primary/20">
              <Icon icon="solar:target-outline" className="text-primary size-10" />
            </div>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              {t('goals_title')}
            </h2>
          </header>

          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {goals.map(({ icon, key }) => (
              <li key={key}>
                <div className="group h-full flex items-start gap-4 p-6 rounded-2xl bg-background border border-divider transition-all duration-300 hover:border-primary/30">
                  <div className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <Icon icon={icon} className="size-6" />
                  </div>
                  <p className="text-default-700 text-sm leading-relaxed font-medium min-w-0">
                    {t(`goals.${key}`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 md:py-24">
        <div className="container max-w-4xl mx-auto">
          <div className="rounded-3xl border border-divider bg-primary-50/30 dark:bg-primary-950/20 p-8 md:p-12 text-center">
            <div className="inline-flex rounded-full bg-primary/15 p-3 mb-6">
              <Icon icon="solar:hand-stars-outline" className="text-primary size-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground md:text-2xl mb-3">
              {t('cta_title')}
            </h3>
            <p className="text-default-600 mb-8 max-w-lg mx-auto">
              {t('cta_description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                as={Link}
                href="/campaigns"
                color="primary"
                size="lg"
                radius="full"
                className="min-w-[160px] font-semibold"
              >
                {t('cta_campaigns')}
              </Button>
              <Button
                as={Link}
                href="/campaigns/create"
                variant="bordered"
                color="primary"
                size="lg"
                radius="full"
                className="min-w-[160px] font-semibold border-2"
              >
                {t('cta_create')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
