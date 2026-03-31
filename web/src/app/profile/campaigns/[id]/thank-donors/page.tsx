'use client';

import { use, useState } from 'react';
import { Button, Card, CardBody, Chip, Tabs, Tab, Avatar, Input, Spinner } from '@heroui/react';
import { ArrowLeft, Search, Heart, Check, X, Users } from 'lucide-react';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';

import { ProfileSidebar } from '../../../profile-sidebar';
import { ThankYouModal } from '../thank-you-modal';
import { BulkThankYouModal } from '../bulk-thank-you-modal';
import { formatMoney } from '@/lib/utils/format-money';
import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';
import { useListThankableDonations, listThankableDonationsQueryKey } from '@/lib/http/generated/hooks/useListThankableDonations';
import { useThankDonor } from '@/lib/http/generated/hooks/useThankDonor';
import { useBulkThankDonors } from '@/lib/http/generated/hooks/useBulkThankDonors';
import { useGetCampaign } from '@/lib/http/generated/hooks/useGetCampaign';
import type { DonationResource } from '@/lib/http/generated/models/DonationResource';

type Donation = {
  id: number;
  donorName: string | null;
  donorEmail?: string | null;
  amountCents: number;
  createdAt: string;
  isAnonymous: boolean;
  thanked: boolean;
  thankYouMessage?: string | null;
  thankYouSentAt?: string | null;
};

const mapDonation = (d: DonationResource): Donation => ({
  id: d.id!,
  donorName: d.donor?.name ?? null,
  donorEmail: d.donor?.email,
  amountCents: d.amountCents ?? 0,
  createdAt: d.createdAt ?? '',
  isAnonymous: d.isAnonymous ?? false,
  thanked: !!d.thankedAt,
  thankYouMessage: d.thankYouMessage,
  thankYouSentAt: d.thankedAt,
});

const ThankDonorsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'thanked' | 'pending'>('pending');
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  const { data: campaign } = useGetCampaign(id);
  const { data: donationsResponse, isLoading } = useListThankableDonations(id);
  const thankMutation = useThankDonor();
  const bulkThankMutation = useBulkThankDonors();

  const donations: Donation[] = (donationsResponse?.data ?? []).map(mapDonation);

  const handleThankYou = (donation: Donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const handleSendThankYou = async (message: string) => {
    if (!selectedDonation) return;

    await thankMutation.mutateAsync({
      id: selectedDonation.id,
      data: { message },
    });

    queryClient.invalidateQueries({ queryKey: listThankableDonationsQueryKey(id) });
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  const handleBulkThankYou = () => {
    const pendingDonations = donations.filter(d => !d.thanked && !d.isAnonymous);
    if (pendingDonations.length === 0) return;
    setIsBulkModalOpen(true);
  };

  const handleSendBulkThankYou = async (message: string, selectedIds: string[]) => {
    await bulkThankMutation.mutateAsync({
      identifier: id,
      data: {
        message,
        donationIds: selectedIds.map(Number),
      },
    });

    queryClient.invalidateQueries({ queryKey: listThankableDonationsQueryKey(id) });
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

  if (isLoading) {
    return (
      <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
        <div className="flex gap-8">
          <ProfileSidebar />
          <main className="flex-1 flex items-center justify-center py-20">
            <Spinner size="lg" />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar />

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
              <p className="text-sm text-default-500 mt-1">{campaign?.title}</p>
            </div>
            {counts.pending > 0 && (
              <Button
                color="primary"
                startContent={<Users size={18} />}
                onPress={handleBulkThankYou}
                isLoading={bulkThankMutation.isPending}
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
                                isLoading={thankMutation.isPending && selectedDonation?.id === donation.id}
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
            id: String(d.id),
            donorName: d.donorName,
            amountCents: d.amountCents,
            createdAt: d.createdAt,
          }))}
      />
    </div>
  );
};

export default ThankDonorsPage;
