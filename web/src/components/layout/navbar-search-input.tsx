'use client';

import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { useTranslations } from 'next-intl';

import { SearchIcon } from "@/components/icons/search";

export const NavbarSearchInput = () => {
  const t = useTranslations('navbar');
  
  return (
    <Input
      aria-label={t('search_label')}
      classNames={{
        base: "w-full",
        inputWrapper: "bg-default-100 h-12",
        input: "text-base",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder={t('search_placeholder')}
      size="lg"
      startContent={
        <SearchIcon className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
};
