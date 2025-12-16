export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatPercent = (value: number): string => {
  return `${value}%`;
};

export const formatRemainingDays = (days: number): string => {
  if (days === 0) return 'Hoje';
  if (days === 1) return '1 dia restante';
  return `${days} dias restantes`;
};