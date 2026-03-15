'use client';

import { useState, useEffect, useTransition } from 'react';
import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Spinner,
} from '@heroui/react';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiltersPanel } from '../../components/campaigns/filters-panel';
import { SearchBar } from '../../components/campaigns/search-bar';
import { SortMenu } from '../../components/campaigns/sort-menu';
import { CampaignList } from '../../components/campaigns/campaign-list';
import { FavoritesDrawer } from '../../components/donations/favorites-drawer';
import { DonationCartDrawer } from '../../components/donations/donation-cart-drawer';
import { useDonationContext } from '../../contexts/donation-context';
import type { Campaign } from '@/models/campaign';
import { SearchIcon } from '../../components/icons/search';
import { StatusFilter, TimeFilter } from '@/types';
import { updateSearchParams } from '@/lib/utils/update-search-params';
import { cn } from '@/lib/utils/cn';
import { debounce } from '@/lib/utils/debounce';

type CampaignsViewProps = {
  initialCampaigns: Campaign[];
};

export const CampaignsView = ({ initialCampaigns }: CampaignsViewProps) => {
  const t = useTranslations('campaigns.list');
  const { favorites, cart } = useDonationContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isFavoritesOpen,
    onOpen: onFavoritesOpen,
    onClose: onFavoritesClose,
  } = useDisclosure();
  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();

  const searchQuery = searchParams.get('search') ?? '';
  const selectedCategories = searchParams.getAll('category');
  const selectedTags = searchParams.getAll('tag');
  const statusFilter =
    (searchParams.get('status') as StatusFilter) ?? 'Abertas';
  const timeFilter =
    (searchParams.get('time') as TimeFilter) ?? 'Desde o início';

  const updateFilters = (
    newFilters: Record<string, string | string[] | null | undefined>,
  ) => {
    const params = updateSearchParams(searchParams, newFilters);

    startTransition(() => {
      router.push(`/campaigns?${params.toString()}`);
    });
  };

  const handleSearch = debounce((val: string) => {
    updateFilters({ search: val });
  }, 500);

  const handleApplyFilters = () => {
    onModalOpenChange();
  };

  const clearFilters = () => {
    startTransition(() => {
      router.push('/campaigns');
    });
  };

  return (
    <>
      <div className="flex relative">
        <aside className="hidden lg:block w-80 bg-background border-r border-divider">
          <FiltersPanel
            selectedCategories={selectedCategories}
            setSelectedCategories={(vals) => updateFilters({ category: vals })}
            selectedTags={selectedTags}
            setSelectedTags={(vals) => updateFilters({ tag: vals })}
            onApplyFilters={handleApplyFilters}
            onClearFilters={clearFilters}
          />
        </aside>

        <main className="flex-1">
          <div
            className={cn('p-6 transition-opacity', isPending && 'opacity-50')}
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">{t('title')}</h1>
              {isPending && <Spinner size="sm" />}
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mb-6 items-start lg:items-center justify-between">
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <Button
                  onPress={onModalOpen}
                  variant="bordered"
                  className="lg:hidden"
                >
                  {t('filters_button')}
                </Button>
                <Input
                  placeholder={t('search.placeholder')}
                  startContent={<SearchIcon />}
                  onValueChange={(value) => handleSearch(value)}
                  className="max-w-md"
                />
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="light"
                  startContent={<Heart className="w-4 h-4" />}
                  onPress={onFavoritesOpen}
                >
                  {t('favorites_button', {
                    count: favorites.favorites.length,
                  })}
                </Button>
                <Button
                  variant="light"
                  startContent={<ShoppingCart className="w-4 h-4" />}
                  onPress={onCartOpen}
                >
                  {t('cart_button', { count: cart.cart.length })}
                </Button>
                <SortMenu
                  statusFilter={statusFilter}
                  setStatusFilter={(val) =>
                    updateFilters({ status: val as string })
                  }
                  timeFilter={timeFilter}
                  setTimeFilter={(val) =>
                    updateFilters({ time: val as string })
                  }
                />
                <Button color="primary" as={Link} href="/campaigns/create">
                  {t('create_button')}
                </Button>
              </div>
            </div>

            <CampaignList campaigns={initialCampaigns} />
          </div>
        </main>
      </div>

      <Modal isOpen={isModalOpen} onOpenChange={onModalOpenChange} size="lg">
        <ModalContent>
          <ModalHeader>{t('filters.title')}</ModalHeader>
          <ModalBody>
            <FiltersPanel
              selectedCategories={selectedCategories}
              setSelectedCategories={(vals) =>
                updateFilters({ category: vals })
              }
              selectedTags={selectedTags}
              setSelectedTags={(vals) => updateFilters({ tag: vals })}
              onApplyFilters={handleApplyFilters}
              onClearFilters={clearFilters}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <FavoritesDrawer isOpen={isFavoritesOpen} onClose={onFavoritesClose} />
      <DonationCartDrawer isOpen={isCartOpen} onClose={onCartClose} />
    </>
  );
};
