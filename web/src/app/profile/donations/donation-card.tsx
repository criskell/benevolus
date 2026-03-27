'use client';

import { Card, CardBody, Button } from '@heroui/react';
import { ImageOff } from 'lucide-react';
import Link from 'next/link';
import { formatMoney } from '@/lib/utils/format-money';

export type Donation = {
  campaignTitle: string;
  campaignImage: string | null;
  campaignSlug: string;
  donorName: string;
  amountCents: number;
  createdAt: string;
};

type DonationCardProps = {
  donation: Donation;
};

export const DonationCard = ({ donation }: DonationCardProps) => {
  const { campaignTitle, campaignImage, campaignSlug, amountCents, createdAt } =
    donation;
  const formattedAmount = formatMoney(amountCents);
  const formattedDate = new Date(createdAt).toLocaleDateString('pt-BR');

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        {campaignImage ? (
          <img
            src={campaignImage}
            alt={campaignTitle}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-default-100">
            <ImageOff size={48} className="text-default-300" />
          </div>
        )}
      </div>

      <CardBody className="p-6 flex flex-col h-full">
        <p className="text-base font-medium mb-4 line-clamp-2 flex-1">
          {campaignTitle}
        </p>

        <div className="space-y-3 mt-auto">
          <div>
            <p className="text-2xl font-semibold text-primary">
              R$ {formattedAmount}
            </p>
            <p className="text-sm text-default-500">Sua doação</p>
          </div>

          <div className="text-sm text-default-500">
            <span>{formattedDate}</span>
          </div>

          <Button
            as={Link}
            href={`/campaigns/${campaignSlug}`}
            variant="light"
            size="md"
            className="w-full justify-start text-default-600"
          >
            Ver detalhes
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
