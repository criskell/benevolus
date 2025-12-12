'use client';

import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('home');

  console.log(t);

  return (
    <section className="z-20 flex flex-col items-center justify-center gap-[18px] sm:gap-6">
      <Button
        className="border-default-100 bg-default-50 text-small text-default-500 h-9 overflow-hidden border-1 px-[18px] py-2 leading-5 font-normal"
        endContent={
          <Icon
            className="flex-none outline-hidden [&>path]:stroke-2"
            icon="solar:arrow-right-linear"
            width={20}
          />
        }
        radius="full"
        variant="bordered"
      >
        Nossa missão
      </Button>
      <div className="text-center text-[clamp(40px,10vw,40px)] leading-[1.2] font-bold tracking-tighter sm:text-[46px]">
        <div>
          A maneira mais
          <br /> fácil de fazer a diferença.
        </div>
      </div>
      <p className="text-default-500 text-center leading-7 font-normal sm:w-[466px] sm:text-[18px]">
        {t('headline')}
      </p>
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
        <Button color="primary" radius="full">
          Faça uma doação
        </Button>
        <Button
          className="border-default-100"
          endContent={
            <span className="bg-default-100 pointer-events-none flex h-[22px] w-[22px] items-center justify-center rounded-full">
              <Icon
                className="text-default-500 [&>path]:stroke-[1.5]"
                icon="solar:arrow-right-linear"
                width={16}
              />
            </span>
          }
          radius="full"
          variant="bordered"
        >
          Crie uma nova campanha
        </Button>
      </div>
    </section>
  );
}
