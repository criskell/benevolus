import { atomWithStorage } from 'jotai/utils';
import type { FavoriteItem } from '@/models/favorite';

export const favoritesAtom = atomWithStorage<FavoriteItem[]>('favorites', []);