import { atom } from 'jotai';

export const pendingDonationAtom = atom<{
  pixCode?: string;
  qrCodeUrl?: string;
} | null>(null);
