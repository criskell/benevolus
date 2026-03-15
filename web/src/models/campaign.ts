export type Campaign = {
  id?: number;
  slug?: string;
  title: string;
  description?: string;
  category?: string;
  daysRemaining?: number;
  progress: number;
  raised: number;
  goal: number;
  status?: string;
  image?: string | null;
  images?: string[];
};
