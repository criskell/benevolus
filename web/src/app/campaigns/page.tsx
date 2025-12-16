'use client';

import { BreadcrumbItem, Breadcrumbs, Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/react';
import { PageLayout } from '../../components/campaigns/PageLayout';
import { FiltersPanel } from '../../components/campaigns/FiltersPanel';
import { SearchBar } from '../../components/campaigns/SearchBar';
import { SortMenu } from '../../components/campaigns/SortMenu';
import { CampaignList } from '../../components/campaigns/CampaignList';
import { useCampaignFilters } from '../../hooks/useCampaignFilters';
import { campaigns as rawCampaigns } from '../../data/campaigns';
import type { Campaign } from '@/models/campaign';

// Map raw data to Campaign model
const mappedCampaigns: Campaign[] = rawCampaigns.campaigns.map(c => ({
  slug: c.slug,
  title: c.title,
  category: c.category,
  daysRemaining: c.daysRemaining,
  progress: c.progressPercent || 0,
  currentAmount: c.raised || 0,
  goalAmount: c.goal || 0,
  images: [c.image || '', c.image || ''],
}));

export default function CampaignsPage() {
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
    // Apply filters logic if needed
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
            <div className="flex flex-col lg:flex-row gap-4 mb-6 items-start lg:items-center justify-between">
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <Button onPress={onOpen} variant="bordered" className="lg:hidden">
                  Filtros
                </Button>
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
              <SortMenu
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                timeFilter={timeFilter}
                setTimeFilter={setTimeFilter}
              />
              <Button color="primary">
                Criar vaquinha
              </Button>
            </div>
            <CampaignList campaigns={filteredCampaigns} />
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
    </>
  );
}