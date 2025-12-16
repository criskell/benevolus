'use client';

import { Card, CardBody, Chip, Progress, Button, Image } from '@heroui/react';
import Link from 'next/link';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import type { Campaign } from '@/models/campaign';
import { formatMoney } from '@/lib/utils/format-money';

export type CampaignCardProps = {
  campaign: Campaign;
};

export const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardBody className="p-0">
        <div className="relative w-full aspect-video">
          <Image
            src={campaign.images[0]}
            alt={campaign.title}
            className="w-[100dvw] h-full object-cover rounded-t-lg"
          />
          <Button
            isIconOnly
            variant="solid"
            className="absolute top-2 right-2 bg-white/80 z-10"
            size="sm"
            onPress={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
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
        </div>
      </CardBody>
    </Card>
  );
};
