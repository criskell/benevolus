'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { SearchIcon } from "@/components/icons/search";
import { campaigns } from '@/data/campaigns';

export const NavbarSearchInput = () => {
  const t = useTranslations('navbar');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtrar campanhas baseado na pesquisa
  const filteredCampaigns = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return campaigns.campaigns
      .filter(campaign => 
        campaign.title.toLowerCase().includes(query) ||
        campaign.category.toLowerCase().includes(query)
      )
      .slice(0, 5); // Limitar a 5 resultados
  }, [searchQuery]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lidar com navegação por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredCampaigns.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredCampaigns.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectCampaign(filteredCampaigns[selectedIndex].slug);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelectCampaign = (slug?: string) => {
    if (slug) {
      router.push(`/${slug}`);
      setSearchQuery('');
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    setIsOpen(value.trim().length > 0);
    setSelectedIndex(-1);
  };

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
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
        value={searchQuery}
        onValueChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {/* Dropdown de sugestões */}
      {isOpen && filteredCampaigns.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-content1 rounded-lg shadow-lg border border-divider max-h-[400px] overflow-y-auto"
        >
          <div className="flex flex-col py-2">
            {filteredCampaigns.map((campaign, index) => (
              <button
                key={campaign.slug}
                className={`w-full px-4 py-3 text-left transition-colors hover:bg-default-100 block ${
                  index === selectedIndex ? 'bg-default-100' : ''
                }`}
                onClick={() => handleSelectCampaign(campaign.slug)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex flex-row gap-3 items-start">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-primary font-medium mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
                      {campaign.category}
                    </div>
                    <div className="text-sm font-medium text-foreground line-clamp-2 overflow-hidden">
                      {campaign.title}
                    </div>
                    <div className="text-xs text-default-500 mt-1">
                      {campaign.progressPercent}% arrecadado
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mensagem quando não há resultados */}
      {isOpen && searchQuery.trim() && filteredCampaigns.length === 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-content1 rounded-lg shadow-lg border border-divider"
        >
          <div className="py-4 px-4 text-center text-default-500 text-sm">
            {t('search_no_results')}
          </div>
        </div>
      )}
    </div>
  );
};
