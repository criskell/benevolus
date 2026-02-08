import { Select, SelectItem } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { StatusFilter, TimeFilter } from '../../types';
import { Dispatch, SetStateAction } from 'react';

interface SortMenuProps {
  statusFilter: StatusFilter;
  setStatusFilter: Dispatch<SetStateAction<StatusFilter>>;
  timeFilter: TimeFilter;
  setTimeFilter: Dispatch<SetStateAction<TimeFilter>>;
}

export const SortMenu = ({
  statusFilter,
  setStatusFilter,
  timeFilter,
  setTimeFilter,
}: SortMenuProps) => {
  const t = useTranslations('campaigns.list.sort');
  
  const statusOptions: { value: StatusFilter; labelKey: string }[] = [
    { value: 'Abertas', labelKey: 'status_open' },
    { value: 'Recentes', labelKey: 'status_recent' },
    { value: 'Perto de encerrar', labelKey: 'status_closing_soon' },
    { value: 'Encerradas', labelKey: 'status_closed' },
    { value: 'Metas batidas', labelKey: 'status_goal_reached' },
    { value: 'Maiores arrecadações', labelKey: 'status_highest_raised' },
    { value: 'Todas', labelKey: 'status_all' },
  ];

  const timeOptions: { value: TimeFilter; labelKey: string }[] = [
    { value: 'Desde o início', labelKey: 'period_all_time' },
    { value: 'Últimos 7 dias', labelKey: 'period_last_7_days' },
    { value: 'Últimos 14 dias', labelKey: 'period_last_14_days' },
    { value: 'Mês passado', labelKey: 'period_last_month' },
    { value: 'Este mês', labelKey: 'period_this_month' },
    { value: 'Últimos 3 meses', labelKey: 'period_last_3_months' },
    { value: 'Este ano', labelKey: 'period_this_year' },
  ];

  return (
    <div className="flex gap-4">
      <Select
        label={t('status_label')}
        selectedKeys={[statusFilter]}
        onSelectionChange={(keys) => setStatusFilter(Array.from(keys)[0] as StatusFilter)}
        className="w-48"
      >
        {statusOptions.map((option) => (
          <SelectItem key={option.value}>
            {t(option.labelKey)}
          </SelectItem>
        ))}
      </Select>
      <Select
        label={t('period_label')}
        selectedKeys={[timeFilter]}
        onSelectionChange={(keys) => setTimeFilter(Array.from(keys)[0] as TimeFilter)}
        className="w-48"
      >
        {timeOptions.map((option) => (
          <SelectItem key={option.value}>
            {t(option.labelKey)}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};