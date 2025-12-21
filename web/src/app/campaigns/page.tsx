'use client';

import { useState } from 'react';
import { BreadcrumbItem, Breadcrumbs, Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, Tabs, Tab } from '@heroui/react';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '../../components/campaigns/page-layout';
import { FiltersPanel } from '../../components/campaigns/filters-panel';
import { SearchBar } from '../../components/campaigns/search-bar';
import { SortMenu } from '../../components/campaigns/sort-menu';
import { CampaignList } from '../../components/campaigns/campaign-list';
import { useCampaignFilters } from '../../hooks/useCampaignFilters';
import { campaigns as rawCampaigns } from '../../data/campaigns';
import { FavoritesDrawer } from '../../components/donations/favorites-drawer';
import { DonationCartDrawer } from '../../components/donations/donation-cart-drawer';
import { CategoryDonationTab } from '../../components/donations/category-donation-tab';
import { useDonationContext } from '../../contexts/DonationContext';
import type { Campaign } from '@/models/campaign';

const mappedCampaigns: Campaign[] = rawCampaigns.campaigns.map(c => ({
  slug: c.slug,
  title: c.title,
  category: c.category,
  daysRemaining: c.daysRemaining,
  progress: c.progressPercent || 0,
  currentAmount: Math.round(c.raised * 100),
  goalAmount: Math.round(c.goal * 100),
  image: c.image,
  images: [c.image || '', c.image || ''],
}));

export default function CampaignsPage() {
  const { favorites, cart } = useDonationContext();
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,
    selectedTags,
    setSelectedTags,
    statusFilter,
    setStatusFilter,
    timeFilter,
    setTimeFilter,
    filteredCampaigns,
    clearFilters,
  } = useCampaignFilters({ campaigns: mappedCampaigns });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleApplyFilters = () => {
    onOpenChange();
  };

  return (
    <>
      <PageLayout
        sidebar={
          <FiltersPanel
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            onApplyFilters={handleApplyFilters}
            onClearFilters={clearFilters}
          />
        }
        main={
          <div className="p-6">
            <Breadcrumbs className="mb-4">
              <BreadcrumbItem>Início</BreadcrumbItem>
              <BreadcrumbItem>Vaquinhas</BreadcrumbItem>
            </Breadcrumbs>
            <h1 className="text-3xl font-bold mb-6">Encontre todas nossas vaquinhas</h1>

            <Tabs
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(key as string)}
              className="mb-6"
            >
              <Tab key="explore" title="Explorar Vaquinhas">
                <div className="flex flex-col lg:flex-row gap-4 mb-6 items-start lg:items-center justify-between">
                  <div className="flex items-center gap-4 w-full lg:w-auto">
                    <Button onPress={onOpen} variant="bordered" className="lg:hidden">
                      Filtros
                    </Button>
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="light"
                      startContent={<Heart className="w-4 h-4" />}
                      onPress={() => setFavoritesOpen(true)}
                    >
                      Favoritos ({favorites.favorites.length})
                    </Button>
                    <Button
                      variant="light"
                      startContent={<ShoppingCart className="w-4 h-4" />}
                      onPress={() => setCartOpen(true)}
                    >
                      Carrinho ({cart.cart.length})
                    </Button>
                    <SortMenu
                      statusFilter={statusFilter}
                      setStatusFilter={setStatusFilter}
                      timeFilter={timeFilter}
                      setTimeFilter={setTimeFilter}
                    />
                    <Button color="primary" as={Link} href="/campaigns/create">
                      Criar vaquinha
                    </Button>
                  </div>
                </div>
                <CampaignList campaigns={filteredCampaigns} />
              </Tab>

              <Tab key="donate-by-cause" title="Doar por Causa">
                <CategoryDonationTab />
              </Tab>
            </Tabs>
          </div>
        }
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          <ModalHeader>Filtros</ModalHeader>
          <ModalBody>
            <FiltersPanel
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              onApplyFilters={handleApplyFilters}
              onClearFilters={clearFilters}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <FavoritesDrawer isOpen={favoritesOpen} onClose={() => setFavoritesOpen(false)} />
      <DonationCartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}