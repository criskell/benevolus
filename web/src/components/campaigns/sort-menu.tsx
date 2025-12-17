import { Select, SelectItem } from '@heroui/react';
import { StatusFilter, TimeFilter } from '../../types';
import { Dispatch, SetStateAction } from 'react';

interface SortMenuProps {
  statusFilter: StatusFilter;
  setStatusFilter: Dispatch<SetStateAction<StatusFilter>>;
  timeFilter: TimeFilter;
  setTimeFilter: Dispatch<SetStateAction<TimeFilter>>;
}

const statusOptions: StatusFilter[] = [
  'Abertas',
  'Recentes',
  'Perto de encerrar',
  'Encerradas',
  'Metas batidas',
  'Maiores arrecadações',
  'Todas',
];

const timeOptions: TimeFilter[] = [
  'Desde o início',
  'Últimos 7 dias',
  'Últimos 14 dias',
  'Mês passado',
  'Este mês',
  'Últimos 3 meses',
  'Este ano',
];

export const SortMenu = ({
  statusFilter,
  setStatusFilter,
  timeFilter,
  setTimeFilter,
}: SortMenuProps) => {
  return (
    <div className="flex gap-4">
      <Select
        label="Status"
        selectedKeys={[statusFilter]}
        onSelectionChange={(keys) => setStatusFilter(Array.from(keys)[0] as StatusFilter)}
        className="w-48"
      >
        {statusOptions.map((option) => (
          <SelectItem key={option}>
            {option}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Período"
        selectedKeys={[timeFilter]}
        onSelectionChange={(keys) => setTimeFilter(Array.from(keys)[0] as TimeFilter)}
        className="w-48"
      >
        {timeOptions.map((option) => (
          <SelectItem key={option}>
            {option}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};