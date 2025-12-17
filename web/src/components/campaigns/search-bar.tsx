import { Input } from '@heroui/react';
import { SearchIcon } from '../icons/search';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <Input
      placeholder="O que você deseja buscar?"
      startContent={<SearchIcon />}
      value={value}
      onValueChange={onChange}
      className="max-w-md"
    />
  );
};