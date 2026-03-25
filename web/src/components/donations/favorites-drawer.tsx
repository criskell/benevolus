'use client';

import { Drawer, DrawerContent, DrawerHeader, DrawerBody, Button, Card, CardBody, Image, Chip } from '@heroui/react';
import { Heart, X } from 'lucide-react';
import { useListFavoritedCampaigns, useToggleCampaignFavorite, listFavoritedCampaignsQueryKey } from '@/lib/http/generated';
import { useQueryClient } from '@tanstack/react-query';

type FavoritesDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const FavoritesDrawer = ({ isOpen, onClose }: FavoritesDrawerProps) => {
  const queryClient = useQueryClient();
  const { data: favoritedCampaigns } = useListFavoritedCampaigns();
  const { mutate: toggleFavorite } = useToggleCampaignFavorite();

  const handleRemove = (slug: string) => {
    toggleFavorite({ campaign: slug }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: listFavoritedCampaignsQueryKey() });
      }
    });
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Campanhas Favoritas</h3>
            <Button isIconOnly variant="light" onPress={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DrawerHeader>
        <DrawerBody>
          {!favoritedCampaigns || favoritedCampaigns.length === 0 ? (
            <p className="text-center text-gray-500">Nenhuma campanha favorita ainda.</p>
          ) : (
            <div className="space-y-4">
              {favoritedCampaigns.map((fav) => (
                <Card key={fav.slug}>
                  <CardBody className="p-4">
                    <div className="flex items-center space-x-4">
                      {fav.image && (
                        <Image
                          src={fav.image}
                          alt={fav.title ?? ''}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm line-clamp-2">{fav.title}</h4>
                        <Chip size="sm" variant="flat" className="mt-1">
                          Favorita
                        </Chip>
                      </div>
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        onPress={() => handleRemove(fav.slug ?? '')}
                      >
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
