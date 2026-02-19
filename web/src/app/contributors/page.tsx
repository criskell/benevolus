'use client';

import { Icon } from '@iconify/react';
import { Button, Link } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { ContributorCard } from '@/components/contributors/contributor-card';
import { contributors } from '@/data/contributors';

const ContributorsPage = () => {
  const t = useTranslations('contributors');
  const localizedContributors = contributors.map((contributor) => ({
    ...contributor,
    name: t(`members.${contributor.id}.name`),
    bio: t(`members.${contributor.id}.bio`),
    skills: contributor.skillKeys.map((key) => t(key)),
  }));

  return (
    <main className="min-h-screen overflow-x-hidden">
      <section className="min-h-[38vh] flex flex-col items-center justify-center px-6 pt-20 pb-20 md:min-h-[44vh] md:pt-24 md:pb-28">
        <div className="container max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary px-4 py-1.5 text-sm font-medium mb-6 border border-primary/20">
            <Icon icon="solar:users-group-two-rounded-bold" className="size-4" />
            {t('hero.badge')}
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.1]">
            {t('hero.title')}
          </h1>
          <p className="mt-5 text-lg text-default-600 max-w-2xl mx-auto sm:text-xl">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="relative px-6 -mt-6 md:-mt-10 mb-16 md:mb-20">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: 'solar:users-group-two-rounded-outline',
                value: contributors.length.toString(),
                label: t('stats.contributors'),
              },
              {
                icon: 'solar:code-outline',
                value: t('stats.commits_value'),
                label: t('stats.commits_label'),
              },
              {
                icon: 'solar:star-outline',
                value: t('stats.open_source_value'),
                label: t('stats.open_source_label'),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-divider bg-background p-5 md:p-6 shadow-sm"
              >
                <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10">
                  <Icon icon={stat.icon} className="size-5 text-primary" />
                </div>
                <span className="text-2xl font-bold text-foreground md:text-3xl">
                  {stat.value}
                </span>
                <span className="text-xs text-default-500 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24 bg-default-100/50 border-t border-divider/50">
        <div className="container max-w-6xl mx-auto">
          <header className="flex flex-col items-center gap-4 mb-14 text-center">
            <div className="rounded-2xl bg-primary/15 p-4 ring-2 ring-primary/20">
              <Icon
                icon="solar:programming-outline"
                className="text-primary size-10"
              />
            </div>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              {t('team.title')}
            </h2>
            <p className="text-default-500 max-w-lg text-sm md:text-base">
              {t('team.subtitle')}
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {localizedContributors.map((contributor) => (
              <ContributorCard
                key={contributor.id}
                contributor={contributor}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="container max-w-4xl mx-auto">
          <div className="rounded-3xl border border-divider bg-primary-50/30 dark:bg-primary-950/20 p-8 md:p-12 text-center">
            <div className="inline-flex rounded-full bg-primary/15 p-3 mb-6">
              <Icon
                icon="solar:code-square-outline"
                className="text-primary size-8"
              />
            </div>
            <h3 className="text-xl font-bold text-foreground md:text-2xl mb-3">
              {t('cta.title')}
            </h3>
            <p className="text-default-600 mb-8 max-w-lg mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                as={Link}
                href="https://github.com/"
                isExternal
                color="primary"
                size="lg"
                radius="full"
                className="min-w-[160px] font-semibold"
                startContent={
                  <Icon icon="mdi:github" className="size-5" />
                }
              >
                {t('cta.github_button')}
              </Button>
              <Button
                as={Link}
                href="/mission"
                variant="bordered"
                color="primary"
                size="lg"
                radius="full"
                className="min-w-[160px] font-semibold border-2"
              >
                {t('cta.mission_button')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContributorsPage;
