export type Campaign = {
  slug?: string;
  title: string;
  category: string;
  daysRemaining: number;
  progress: number;
  currentAmount: number;
  goalAmount: number;
  image: string;
  images?: string[];
};
