'use client';

import { useState } from 'react';
import { Avatar, Card, CardBody, Button, Chip } from '@heroui/react';
import { Heart, Check } from 'lucide-react';
import { formatMoney } from '@/lib/utils/format-money';
import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';
import { ThankYouModal } from './thank-you-modal';

type Donation = {
  id: string;
  donorName: string | null;
  amountCents: number;
  createdAt: string;
  isAnonymous: boolean;
  thanked?: boolean;
  thankYouMessage?: string;
  thankYouSentAt?: string;
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
  const [thankedDonations, setThankedDonations] = useState<Set<string>>(
    new Set(donations.filter(d => d.thanked).map(d => d.id))
  );
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleThankYou = (donation: Donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const handleSendThankYou = (message: string) => {
    if (selectedDonation) {
      setThankedDonations(prev => new Set([...prev, selectedDonation.id]));
      // Aqui seria feita a chamada à API para enviar o agradecimento
      console.log('Enviando agradecimento:', {
        donationId: selectedDonation.id,
        message,
      });
    }
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

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
    <>
      <Card>
        <CardBody className="p-0">
          <div className="divide-y divide-default-100">
            {donations.map((donation) => {
              const displayName = donation.isAnonymous ? 'Doador anônimo' : donation.donorName || 'Doador';
              const isThanked = thankedDonations.has(donation.id);

              return (
                <div key={donation.id} className="flex items-center gap-4 p-4 hover:bg-default-50 transition-colors">
                  <Avatar
                    name={donation.isAnonymous ? '?' : displayName}
                    getInitials={donation.isAnonymous ? () => '?' : getUserNameInitials}
                    size="sm"
                    className={donation.isAnonymous ? 'bg-default-200' : ''}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium truncate">{displayName}</p>
                      {isThanked && (
                        <Chip
                          size="sm"
                          variant="flat"
                          color="success"
                          startContent={<Check size={12} />}
                        >
                          Agradecido
                        </Chip>
                      )}
                    </div>
                    <p className="text-sm text-default-500">{formatDate(donation.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-success">
                      +{formatMoney(donation.amountCents)}
                    </p>
                    {!donation.isAnonymous && !isThanked && (
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        startContent={<Heart size={16} />}
                        onPress={() => handleThankYou(donation)}
                      >
                        Agradecer
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {selectedDonation && (
        <ThankYouModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDonation(null);
          }}
          onSend={handleSendThankYou}
          donorName={selectedDonation.donorName || 'Doador'}
          donationAmount={selectedDonation.amountCents}
        />
      )}
    </>
  );
};
