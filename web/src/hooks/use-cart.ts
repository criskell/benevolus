import { useAtom } from 'jotai';
import { cartAtom } from '@/atoms/cart';
import type { CartItem } from '@/models/cart';

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, amount: number) => {
    setCart(prev => prev.map((item, i) => i === index ? { ...item, amount } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.amount, 0);
  };

  const autoSplit = (totalAmount: number, slugs: string[], criteria: 'equal' | 'mixed') => {
    if (slugs.length === 0) return [];

    let distribution: { slug: string; amount: number }[] = [];

    if (criteria === 'equal') {
      const amountPer = Math.floor(totalAmount / slugs.length);
      distribution = slugs.map(slug => ({ slug, amount: amountPer }));
      const remainder = totalAmount - amountPer * slugs.length;
      if (remainder > 0 && distribution.length > 0) {
        distribution[0].amount += remainder;
      }
    } else if (criteria === 'mixed') {
      const mainAmount = Math.floor(totalAmount * 0.8);
      const remaining = totalAmount - mainAmount;
      const otherAmount = Math.floor(remaining / (slugs.length - 1));
      distribution = slugs.map((slug, index) => ({
        slug,
        amount: index === 0 ? mainAmount : otherAmount
      }));
      const remainder = remaining - otherAmount * (slugs.length - 1);
      if (remainder > 0 && distribution.length > 1) {
        distribution[1].amount += remainder;
      }
    }

    return distribution;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    autoSplit,
  };
};