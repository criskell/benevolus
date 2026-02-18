'use client';

import { use, useState } from 'react';
import { Button, Card, CardBody, Chip, Tabs, Tab, Avatar, Input } from '@heroui/react';
import { ArrowLeft, Search, Heart, Check, X, Users } from 'lucide-react';
import Link from 'next/link';

import { ProfileSidebar } from '../../../profile-sidebar';
import { ThankYouModal } from '../thank-you-modal';
import { BulkThankYouModal } from '../bulk-thank-you-modal';
import { formatMoney } from '@/lib/utils/format-money';
import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';

type Donation = {
  id: string;
  donorName: string | null;
  donorEmail?: string;
  amountCents: number;
  createdAt: string;
  isAnonymous: boolean;
  thanked: boolean;
  thankYouMessage?: string;
  thankYouSentAt?: string;
};

const ThankDonorsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'thanked' | 'pending'>('pending');
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  const userData = {
    name: 'Cristiano',
    followedCampaigns: 0,
    donationsCount: 3,
  };

  const campaignTitle = 'Ajuda para Maria reconstruir sua casa';

  const [donations, setDonations] = useState<Donation[]>([
    {
      id: '1',
      donorName: 'João Silva',
      donorEmail: 'joao.silva@email.com',
      amountCents: 5000,
      createdAt: '2025-02-08T10:30:00',
      isAnonymous: false,
      thanked: false,
    },
    {
      id: '2',
      donorName: null,
      amountCents: 10000,
      createdAt: '2025-02-07T15:45:00',
      isAnonymous: true,
      thanked: false,
    },
    {
      id: '3',
      donorName: 'Maria Santos',
      donorEmail: 'maria.santos@email.com',
      amountCents: 2500,
      createdAt: '2025-02-06T18:45:00',
      isAnonymous: false,
      thanked: true,
      thankYouMessage: 'Maria, muito obrigado pela sua generosa doação! Seu apoio significa o mundo para nós. 💙',
      thankYouSentAt: '2025-02-06T19:00:00',
    },
    {
      id: '4',
      donorName: 'Pedro Oliveira',
      donorEmail: 'pedro.oliveira@email.com',
      amountCents: 15000,
      createdAt: '2025-02-05T14:20:00',
      isAnonymous: false,
      thanked: true,
      thankYouMessage: 'Pedro, gratidão pela sua contribuição! 🙏',
      thankYouSentAt: '2025-02-05T15:00:00',
    },
    {
      id: '5',
      donorName: null,
      amountCents: 5000,
      createdAt: '2025-02-04T11:00:00',
      isAnonymous: true,
      thanked: false,
    },
    {
      id: '6',
      donorName: 'Ana Costa',
      donorEmail: 'ana.costa@email.com',
      amountCents: 8000,
      createdAt: '2025-02-03T09:30:00',
      isAnonymous: false,
      thanked: false,
    },
    {
      id: '7',
      donorName: 'Carlos Mendes',
      donorEmail: 'carlos.mendes@email.com',
      amountCents: 12000,
      createdAt: '2025-02-02T16:15:00',
      isAnonymous: false,
      thanked: true,
      thankYouMessage: 'Carlos, sua doação fez toda a diferença! Muito obrigado! ❤️',
      thankYouSentAt: '2025-02-02T17:00:00',
    },
    {
      id: '8',
      donorName: 'Juliana Ferreira',
      donorEmail: 'juliana.ferreira@email.com',
      amountCents: 20000,
      createdAt: '2025-02-01T12:45:00',
      isAnonymous: false,
      thanked: false,
    },
  ]);

  const handleThankYou = (donation: Donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const handleSendThankYou = (message: string) => {
    if (selectedDonation) {
      setDonations(prev =>
        prev.map(d =>
          d.id === selectedDonation.id
            ? {
                ...d,
                thanked: true,
                thankYouMessage: message,
                thankYouSentAt: new Date().toISOString(),
              }
            : d
        )
      );
    }
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  const handleBulkThankYou = () => {
    const pendingDonations = donations.filter(d => !d.thanked && !d.isAnonymous);
    if (pendingDonations.length === 0) {
      alert('Não há doadores pendentes para agradecer.');
      return;
    }
    setIsBulkModalOpen(true);
  };

  const handleSendBulkThankYou = (message: string, selectedIds: string[]) => {
    setDonations(prev =>
      prev.map(d =>
        selectedIds.includes(d.id)
          ? {
              ...d,
              thanked: true,
              thankYouMessage: message
                .replace(/{nome}/g, d.donorName || 'Doador')
                .replace(/{valor}/g, formatMoney(d.amountCents)),
              thankYouSentAt: new Date().toISOString(),
            }
          : d
      )
    );
    setIsBulkModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredDonations = donations
    .filter(d => {
      if (activeTab === 'thanked') return d.thanked;
      if (activeTab === 'pending') return !d.thanked && !d.isAnonymous;
      return true;
    })
    .filter(d => {
      if (!searchQuery) return true;
      if (d.isAnonymous) return false;
      return d.donorName?.toLowerCase().includes(searchQuery.toLowerCase());
    });

  const getCounts = () => {
    const all = donations.length;
    const thanked = donations.filter(d => d.thanked).length;
    const pending = donations.filter(d => !d.thanked && !d.isAnonymous).length;
    return { all, thanked, pending };
  };

  const counts = getCounts();

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar
          userName={userData.name}
          followedCampaigns={userData.followedCampaigns}
          donationsCount={userData.donationsCount}
        />

        <main className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <Button
              as={Link}
              href={`/profile/campaigns/${id}`}
              variant="light"
              isIconOnly
              size="sm"
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">Agradecer Doadores</h1>
              <p className="text-sm text-default-500 mt-1">{campaignTitle}</p>
            </div>
            {counts.pending > 0 && (
              <Button
                color="primary"
                startContent={<Users size={18} />}
                onPress={handleBulkThankYou}
              >
                Agradecer todos ({counts.pending})
              </Button>
            )}
          </div>

          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardBody className="p-4">
                <p className="text-sm text-default-500 mb-1">Total de doadores</p>
                <p className="text-2xl font-bold">{counts.all}</p>
              </CardBody>
            </Card>
            <Card className="border-l-4 border-l-success">
              <CardBody className="p-4">
                <p className="text-sm text-default-500 mb-1">Agradecidos</p>
                <p className="text-2xl font-bold text-success">{counts.thanked}</p>
              </CardBody>
            </Card>
            <Card className="border-l-4 border-l-warning">
              <CardBody className="p-4">
                <p className="text-sm text-default-500 mb-1">Pendentes</p>
                <p className="text-2xl font-bold text-warning">{counts.pending}</p>
              </CardBody>
            </Card>
          </div>

          {/* Busca */}
          <Input
            placeholder="Buscar doador por nome..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            startContent={<Search size={18} />}
            isClearable
            onClear={() => setSearchQuery('')}
          />

          {/* Tabs */}
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as typeof activeTab)}
          >
            <Tab
              key="pending"
              title={
                <div className="flex items-center gap-2">
                  Pendentes
                  <Chip size="sm" variant="flat" color="warning">
                    {counts.pending}
                  </Chip>
                </div>
              }
            />
            <Tab
              key="thanked"
              title={
                <div className="flex items-center gap-2">
                  Agradecidos
                  <Chip size="sm" variant="flat" color="success">
                    {counts.thanked}
                  </Chip>
                </div>
              }
            />
            <Tab
              key="all"
              title={
                <div className="flex items-center gap-2">
                  Todos
                  <Chip size="sm" variant="flat">
                    {counts.all}
                  </Chip>
                </div>
              }
            />
          </Tabs>

          {/* Lista de doadores */}
          {filteredDonations.length === 0 ? (
            <Card>
              <CardBody className="p-12 text-center">
                <p className="text-default-500 text-lg">
                  {searchQuery
                    ? 'Nenhum doador encontrado com esse nome.'
                    : activeTab === 'pending'
                    ? 'Todos os doadores já foram agradecidos! 🎉'
                    : 'Nenhuma doação encontrada.'}
                </p>
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody className="p-0">
                <div className="divide-y divide-divider">
                  {filteredDonations.map((donation) => {
                    const displayName = donation.isAnonymous
                      ? 'Doador anônimo'
                      : donation.donorName || 'Doador';

                    return (
                      <div
                        key={donation.id}
                        className="p-4 hover:bg-default-50 transition-colors"
                      >
                        <div className="flex gap-4">
                          <Avatar
                            name={donation.isAnonymous ? '?' : displayName}
                            getInitials={
                              donation.isAnonymous ? () => '?' : getUserNameInitials
                            }
                            size="md"
                            className={donation.isAnonymous ? 'bg-default-200' : ''}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-lg">{displayName}</p>
                              {donation.thanked ? (
                                <Chip
                                  size="sm"
                                  variant="flat"
                                  color="success"
                                  startContent={<Check size={12} />}
                                >
                                  Agradecido
                                </Chip>
                              ) : (
                                !donation.isAnonymous && (
                                  <Chip size="sm" variant="flat" color="warning">
                                    Pendente
                                  </Chip>
                                )
                              )}
                              {donation.isAnonymous && (
                                <Chip size="sm" variant="flat" startContent={<X size={12} />}>
                                  Anônimo
                                </Chip>
                              )}
                            </div>
                            {donation.donorEmail && (
                              <p className="text-sm text-default-500 mb-1">
                                {donation.donorEmail}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-default-500">
                              <span>Doou {formatMoney(donation.amountCents)}</span>
                              <span>•</span>
                              <span>{formatDate(donation.createdAt)}</span>
                            </div>
                            {donation.thanked && donation.thankYouMessage && (
                              <div className="mt-3 bg-success-50 rounded-lg p-3">
                                <p className="text-xs text-default-600 mb-1">
                                  Mensagem enviada em {formatDate(donation.thankYouSentAt!)}:
                                </p>
                                <p className="text-sm text-default-700">
                                  {donation.thankYouMessage}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="flex items-start">
                            {!donation.isAnonymous && !donation.thanked && (
                              <Button
                                color="primary"
                                variant="flat"
                                startContent={<Heart size={18} />}
                                onPress={() => handleThankYou(donation)}
                              >
                                Agradecer
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          )}
        </main>
      </div>

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

      <BulkThankYouModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onSend={handleSendBulkThankYou}
        donations={donations
          .filter(d => !d.thanked && !d.isAnonymous)
          .map(d => ({
            id: d.id,
            donorName: d.donorName,
            amountCents: d.amountCents,
            createdAt: d.createdAt,
          }))}
      />
    </div>
  );
};

export default ThankDonorsPage;
