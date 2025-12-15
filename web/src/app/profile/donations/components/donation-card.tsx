'use client';

import { Badge, Card, CardBody, Button } from '@heroui/react';
import { MessageCircleIcon } from 'lucide-react';
import { formatMoney } from '@/lib/utils/format-money';

type Donation = {
  id: string;
  campaignTitle: string;
  category: string;
  amount: number;
  paymentMethod: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  images: string[];
};

type DonationCardProps = {
  donation: Donation;
};

const statusLabels = {
  approved: 'Aprovada',
  pending: 'Pendente',
  rejected: 'Rejeitada',
};

const statusColors = {
  approved: 'success',
  pending: 'warning',
  rejected: 'danger',
} as const;

export const DonationCard = ({ donation }: DonationCardProps) => {
  const { images, campaignTitle, category, amount, paymentMethod, date, status } =
    donation;
  const formattedAmount = formatMoney(amount);

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 flex">
        <div className="w-1/2 h-full overflow-hidden">
          <img
            src={images[0]}
            alt={campaignTitle}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/2 h-full overflow-hidden">
          <img
            src={images[1] || images[0]}
            alt={campaignTitle}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <CardBody className="p-6 flex flex-col h-full">
        <Badge variant="flat" className="mb-3 w-fit">
          {category}
        </Badge>

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

          <div className="flex items-center justify-between text-sm text-default-500">
            <span>
              {paymentMethod}, {date}
            </span>
            <Badge
              color={statusColors[status]}
              variant="flat"
              size="sm"
            >
              {statusLabels[status]}
            </Badge>
          </div>

          <Button
            variant="light"
            size="md"
            className="w-full justify-start text-default-600"
            startContent={<MessageCircleIcon size={18} />}
          >
            Ver detalhes
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
