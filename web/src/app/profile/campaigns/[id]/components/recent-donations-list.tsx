'use client';

import { Avatar, Card, CardBody } from '@heroui/react';
import { formatMoney } from '@/lib/utils/format-money';
import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';

type Donation = {
  id: string;
  donorName: string | null;
  amountCents: number;
  createdAt: string;
  isAnonymous: boolean;
};

type RecentDonationsListProps = {
  donations: Donation[];
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const RecentDonationsList = ({ donations }: RecentDonationsListProps) => {
  if (donations.length === 0) {
    return (
      <Card>
        <CardBody className="text-center py-8">
          <p className="text-default-500">Nenhuma doação recebida ainda.</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody className="p-0">
        <div className="divide-y divide-default-100">
          {donations.map((donation) => {
            const displayName = donation.isAnonymous ? 'Doador anônimo' : donation.donorName || 'Doador';

            return (
              <div key={donation.id} className="flex items-center gap-4 p-4">
                <Avatar
                  name={donation.isAnonymous ? '?' : displayName}
                  getInitials={donation.isAnonymous ? () => '?' : getUserNameInitials}
                  size="sm"
                  className={donation.isAnonymous ? 'bg-default-200' : ''}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{displayName}</p>
                  <p className="text-sm text-default-500">{formatDate(donation.createdAt)}</p>
                </div>
                <p className="font-semibold text-success">
                  +{formatMoney(donation.amountCents)}
                </p>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};
