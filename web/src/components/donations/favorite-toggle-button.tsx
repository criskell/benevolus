'use client';

import { useToggleCampaignFavorite, useListFavoritedCampaigns } from '@/lib/http/generated';
import { listFavoritedCampaignsQueryKey } from '@/lib/http/generated';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@heroui/react';
import { Heart } from 'lucide-react';


type FavoriteToggleButtonProps = {
  slug: string;
  title: string;
  image: string;
};

export const FavoriteToggleButton = ({ slug, title, image }: FavoriteToggleButtonProps) => {

  const queryClient = useQueryClient();
  const { data: favorited } = useListFavoritedCampaigns();
  const { mutate: toggleFavorite } = useToggleCampaignFavorite();
  const isLiked = favorited?.some(c => c.slug === slug) ?? false;

  const handleToggle = () => {
    toggleFavorite({ campaign: slug }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: listFavoritedCampaignsQueryKey() });
      }
    })
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
