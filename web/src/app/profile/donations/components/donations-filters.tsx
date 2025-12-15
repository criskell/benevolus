'use client';

import { RadioGroup, Radio } from '@heroui/react';

type DonationsFiltersProps = {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
};

const filterOptions = [
  { value: 'all', label: 'Todas' },
  { value: 'approved', label: 'Aprovadas' },
  { value: 'pending', label: 'Pendente' },
  { value: 'rejected', label: 'Rejeitadas' },
  { value: 'following', label: 'Seguindo' },
  { value: 'outcomes', label: 'Desfechos' },
];

export const DonationsFilters = ({
  selectedFilter,
  onFilterChange,
}: DonationsFiltersProps) => {
  return (
    <aside className="w-64 shrink-0">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>
      <RadioGroup
        value={selectedFilter}
        onValueChange={onFilterChange}
        orientation="vertical"
      >
        {filterOptions.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </RadioGroup>
    </aside>
  );
};
