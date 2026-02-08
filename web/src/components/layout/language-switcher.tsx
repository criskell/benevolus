'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@heroui/react';
import { Globe } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

const languages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  const handleLanguageChange = (langCode: string) => {
    // Salvar preferência no cookie
    document.cookie = `NEXT_LOCALE=${langCode}; path=/; max-age=31536000`; // 1 ano
    
    // Recarregar a página para aplicar o novo idioma
    router.refresh();
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          variant="light"
          className="text-foreground/70 hover:text-primary gap-2"
          aria-label="Selecionar idioma"
        >
          <Globe size={20} />
          <span className="text-xl">{currentLanguage?.flag}</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Seleção de idioma"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={new Set([currentLocale])}
        onAction={(key) => handleLanguageChange(key as string)}
      >
        {languages.map((lang) => (
          <DropdownItem
            key={lang.code}
            startContent={<span className="text-xl">{lang.flag}</span>}
          >
            {lang.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
