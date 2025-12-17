'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { useDonationCart } from '@/hooks/useDonationCart';

interface DonationContextType {
  favorites: ReturnType<typeof useFavorites>;
  cart: ReturnType<typeof useDonationCart>;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const DonationProvider = ({ children }: { children: ReactNode }) => {
  const favorites = useFavorites();
  const cart = useDonationCart();

  return (
    <DonationContext.Provider value={{ favorites, cart }}>
      {children}
    </DonationContext.Provider>
  );
};

export const useDonationContext = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error('useDonationContext must be used within DonationProvider');
  }
  return context;
};