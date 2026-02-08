import { Input } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { SearchIcon } from '../icons/search';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const t = useTranslations('campaigns.list.search');
  
  return (
    <Input
      placeholder={t('placeholder')}
      startContent={<SearchIcon />}
      value={value}
      onValueChange={onChange}
      className="max-w-md"
    />
  );
};