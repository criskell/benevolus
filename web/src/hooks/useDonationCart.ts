import { useCart } from './useCart';

export type CartItem = {
  slug: string;
  title: string;
  image: string;
  amount: number; // in cents
}

export const useDonationCart = () => {
  return useCart();
};