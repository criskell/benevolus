export type Campaign = {
  title: string;
  category: string;
  daysRemaining: number;
  progress: number;
  currentAmount: number;
  goalAmount: number;
  images: [string, string, ...string[]];
};
