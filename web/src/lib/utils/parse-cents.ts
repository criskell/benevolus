export const parseCents = (value: string): number => {
  return Math.round(parseFloat(value || '0') * 100);
};
