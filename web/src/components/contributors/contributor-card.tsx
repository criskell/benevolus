'use client';

import { Icon } from '@iconify/react';
import { Avatar, Chip, Link, Tooltip } from '@heroui/react';
import { useTranslations } from 'next-intl';

type Contributor = {
  name: string;
  avatar: string;
  bio: string;
  skills: string[];
  linkedin?: string;
  github?: string;
};

type ContributorCardProps = {
  contributor: Contributor;
};

export const ContributorCard = ({ contributor }: ContributorCardProps) => {
  const t = useTranslations('contributors.card');

  return (
    <div className="group relative flex flex-col items-center rounded-2xl border border-divider bg-background p-6 pt-10 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary/60 via-primary to-primary/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative mb-5">
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
        <Avatar
          src={contributor.avatar}
          name={contributor.name}
          className="relative size-24 text-large ring-3 ring-default-200 transition-all duration-300 group-hover:ring-primary/40"
          isBordered={false}
        />
      </div>

      <h3 className="text-lg font-bold text-foreground">{contributor.name}</h3>

      <p className="mt-2 text-center text-sm leading-relaxed text-default-500 line-clamp-3">
        {contributor.bio}
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {contributor.skills.map((skill) => (
          <Chip
            key={skill}
            size="sm"
            variant="flat"
            classNames={{
              base: 'bg-primary/10 border-0',
              content: 'text-primary text-xs font-medium',
            }}
          >
            {skill}
          </Chip>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3 pt-4 border-t border-divider/60 w-full justify-center">
        {contributor.linkedin && (
          <Tooltip content={t('linkedin')} delay={400}>
            <Link
              href={contributor.linkedin}
              isExternal
              className="flex items-center justify-center size-9 rounded-xl bg-default-100 text-default-500 transition-all duration-200 hover:bg-[#0A66C2]/15 hover:text-[#0A66C2]"
            >
              <Icon icon="mdi:linkedin" className="size-5" />
            </Link>
          </Tooltip>
        )}
        {contributor.github && (
          <Tooltip content={t('github')} delay={400}>
            <Link
              href={contributor.github}
              isExternal
              className="flex items-center justify-center size-9 rounded-xl bg-default-100 text-default-500 transition-all duration-200 hover:bg-default-200 hover:text-foreground"
            >
              <Icon icon="mdi:github" className="size-5" />
            </Link>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
