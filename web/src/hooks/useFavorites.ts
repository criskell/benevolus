import { useAtom } from 'jotai';
import { favoritesAtom } from '@/atoms/favorites';

export type FavoriteItem = {
  slug: string;
  title: string;
  image: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const addFavorite = (item: FavoriteItem) => {
    if (!favorites.some(f => f.slug === item.slug)) {
      setFavorites(prev => [...prev, item]);
    }
  };

  const removeFavorite = (slug: string) => {
    setFavorites(prev => prev.filter(f => f.slug !== slug));
  };

  const isFavorite = (slug: string) => {
    return favorites.some(f => f.slug === slug);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.slug)) {
      removeFavorite(item.slug);
    } else {
      addFavorite(item);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
};