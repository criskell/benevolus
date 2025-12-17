'use client';

import { Button } from '@heroui/react';
import { Heart } from 'lucide-react';
import { useDonationContext } from '@/contexts/DonationContext';

type FavoriteToggleButtonProps = {
  slug: string;
  title: string;
  image: string;
};

export const FavoriteToggleButton = ({ slug, title, image }: FavoriteToggleButtonProps) => {
  const { favorites } = useDonationContext();
  const isLiked = favorites.isFavorite(slug);

  const handleToggle = () => {
    favorites.toggleFavorite({ slug, title, image });
  };

  return (
    <Button
      isIconOnly
      variant="solid"
      className="absolute top-2 right-2 bg-white/80 z-10"
      size="sm"
      onPress={handleToggle}
    >
      <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
    </Button>
  );
};