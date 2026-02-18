import { useState, useMemo } from 'react';
import { Campaign } from '@/models/campaign';
import { StatusFilter, TimeFilter } from '@/types';

type UseCampaignFiltersProps = {
  campaigns: Campaign[];
}

export const useCampaignFilters = ({ campaigns }: UseCampaignFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Abertas');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('Desde o início');

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      if (searchQuery && !campaign.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      if (selectedCategories.length > 0 && !selectedCategories.includes(campaign.category)) {
        return false;
      }

      if (statusFilter === 'Abertas' && campaign.daysRemaining <= 0) return false;
      if (statusFilter === 'Encerradas' && campaign.daysRemaining > 0) return false;

      return true;
    });
  }, [campaigns, searchQuery, selectedCategories, statusFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedTags([]);
    setStatusFilter('Abertas');
    setTimeFilter('Desde o início');
  };

  return {
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
  };
};