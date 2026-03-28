export const parseCents = (value: string) =>
  Math.round(parseFloat(value || '0') * 100);
