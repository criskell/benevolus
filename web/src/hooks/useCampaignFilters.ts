import { useState, useMemo } from 'react';
import { Campaign } from '@/models/campaign';

interface UseCampaignFiltersProps {
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
      // Search query
      if (searchQuery && !campaign.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Categories
      if (selectedCategories.length > 0 && !selectedCategories.includes(campaign.category)) {
        return false;
      }

      // Tags - assuming tags are in title or something, but for now, skip or mock
      // Since tags are not in campaign data, perhaps skip for now

      // Status filter - mock logic
      if (statusFilter === 'Abertas' && campaign.daysRemaining <= 0) return false;
      if (statusFilter === 'Encerradas' && campaign.daysRemaining > 0) return false;
      // Add more logic as needed

      // Time filter - mock, perhaps based on daysRemaining or something
      // For simplicity, skip detailed time logic

      return true;
    });
  }, [campaigns, searchQuery, selectedCategories, selectedTags, statusFilter, timeFilter]);

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