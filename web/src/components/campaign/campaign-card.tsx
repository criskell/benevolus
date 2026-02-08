'use client';

import { Card, CardBody, Chip, Progress, Button, Image } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Campaign } from '@/models/campaign';
import { formatMoney } from '@/lib/utils/format-money';
import { FavoriteToggleButton } from '../donations/favorite-toggle-button';

export type CampaignCardProps = {
  campaign: Campaign;
};

export const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const router = useRouter();

  const handleDonate = () => {
    router.push(`/doar?campaign=${campaign.slug}`);
  };

  return (
    <Card className="transition-shadow shadow-none border border-default-200">
      <CardBody className="p-0">
        <div className="relative w-full aspect-video">
          <Image
            src={campaign.image}
            alt={campaign.title}
            className="w-[100dvw] h-full object-cover rounded-t-lg"
          />
          <FavoriteToggleButton
            slug={campaign.slug || ''}
            title={campaign.title}
            image={campaign.image}
          />
        </div>
        <div className="p-4">
          <Chip size="sm" variant="flat" className="mb-2">
            {campaign.category}
          </Chip>
          <Link href={`/campaign/${encodeURIComponent(campaign.title)}`}>
            <h3 className="text-lg font-semibold hover:text-primary cursor-pointer line-clamp-2">
              {campaign.title}
            </h3>
          </Link>
          <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
            <span>{campaign.daysRemaining} dias restantes</span>
            <span>{campaign.progress}%</span>
          </div>
          <Progress value={campaign.progress} className="mt-2" />
          <div className="flex justify-between mt-2 text-sm">
            <span>{formatMoney(campaign.currentAmount)}</span>
            <span>de {formatMoney(campaign.goalAmount)}</span>
          </div>
          <Button
            color="primary"
            className="mt-4 w-full"
            onPress={handleDonate}
          >
            Doar
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
