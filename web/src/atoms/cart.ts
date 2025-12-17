import { atom } from 'jotai';
import type { CartItem } from '@/models/cart';

export const cartAtom = atom<CartItem[]>([]);