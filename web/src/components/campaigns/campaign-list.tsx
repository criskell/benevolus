import { useState } from 'react';
import { Button } from '@heroui/react';
import { Campaign } from '@/models/campaign';
import { CampaignCard } from '../campaign/campaign-card';
import { EmptyState } from './EmptyState';

type CampaignListProps = {
  campaigns: Campaign[];
}

export const CampaignList = ({ campaigns }: CampaignListProps) => {
  const [visibleCount, setVisibleCount] = useState(9);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const visibleCampaigns = campaigns.slice(0, visibleCount);

  if (campaigns.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visibleCampaigns.map((campaign) => (
          <CampaignCard key={campaign.slug} campaign={campaign} />
        ))}
      </div>
      {visibleCount < campaigns.length && (
        <div className="text-center mt-8">
          <Button onPress={loadMore} variant="ghost">
            Carregar mais
          </Button>
        </div>
      )}
    </div>
  );
};
