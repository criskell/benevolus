'use client';

import { use } from 'react';
import { Button, Card, CardBody, Chip, Progress, Divider } from '@heroui/react';
import {
  ArrowLeft,
  Pencil,
  Megaphone,
  Wallet,
  ExternalLink,
  Users,
  TrendingUp,
  Calendar,
  Receipt,
  Heart,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { ProfileSidebar } from '../../profile-sidebar';
import { RecentDonationsList } from './recent-donations-list';
import { StatsCard } from './stats-card';
import { formatMoney } from '@/lib/utils/format-money';
import { useGetCampaign } from '@/lib/http/generated/hooks/useGetCampaign';
import { useListCampaignDonations } from '@/lib/http/generated/hooks/useListCampaignDonations';
import { Spinner } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http/api-client';

import placeholderImage1 from '@/assets/images/placeholder1.jpg';

type CampaignStatus = 'approved' | 'pending' | 'rejected' | 'finished';

type CampaignDetails = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  status: CampaignStatus;
  currentAmountCents: number;
  goalAmountCents: number;
  donationsCount: number;
  image: string;
  createdAt: string;
  expiresAt: string | null;
};

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

const statusConfig: Record<
  string,
  { label: string; color: 'success' | 'warning' | 'danger' | 'default' }
> = {
  open: { label: 'Ativa', color: 'success' },
  in_review: { label: 'Em análise', color: 'warning' },
  rejected: { label: 'Rejeitada', color: 'danger' },
  finished: { label: 'Finalizada', color: 'default' },
  closed: { label: 'Fechada', color: 'default' },
};

const CampaignDashboardPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);

  const { data: campaign, isLoading: isLoadingCampaign } = useGetCampaign(id);
  const { data: donationsResponse, isLoading: isLoadingDonations } =
    useListCampaignDonations(id);
  const { data: transactionData } = useQuery<{
    summary: { balanceCents: number; totalReceivedCents: number; totalWithdrawnCents: number };
  }>({
    queryKey: ['campaign-transactions-summary', id],
    queryFn: async () => {
      const res = await api.get(`/api/campaigns/${id}/transactions`);
      return res.data;
    },
  });

  if (isLoadingCampaign || isLoadingDonations) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Spinner size="lg" label="Carregando informações da campanha..." />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <p className="text-default-500">Campanha não encontrada.</p>
      </div>
    );
  }

  const recentDonations: Donation[] = (donationsResponse?.data || [])
    .map((donation, index) => ({
      id: index.toString(),
      donorName: donation.donor_name || null,
      amountCents: donation.amount_cents || 0,
      createdAt: donation.created_at || new Date().toISOString(),
      isAnonymous: !donation.donor_name,
      thanked: false,
    }))
    .slice(0, 5);

  const goalAmountCents = campaign.goalCents ?? 0;
  const currentAmountCents = campaign.amountRaisedCents ?? 0;
  const progress =
    goalAmountCents > 0
      ? Math.round((currentAmountCents / goalAmountCents) * 100)
      : 0;
  const status = statusConfig[campaign.status || 'open'] || statusConfig.open;

  const menuItems = [
    { label: 'Informações pessoais', active: false },
    { label: 'Comunicação', active: false },
    { label: 'Configurações', active: false },
  ];

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar />

        <main className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <Button
              as={Link}
              href="/profile/campaigns"
              variant="light"
              isIconOnly
              size="sm"
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">Dashboard da Campanha</h1>
            </div>
            <Button
              as={Link}
              href={`/${campaign.slug}`}
              variant="flat"
              size="sm"
              endContent={<ExternalLink size={16} />}
            >
              Ver página pública
            </Button>
          </div>

          <Card>
            <CardBody className="p-0">
              <div className="flex flex-col md:flex-row gap-6 p-6">
                <div className="relative w-full md:w-48 aspect-video md:aspect-square shrink-0">
                  {campaign.image ? (
                    <Image
                      src={campaign.image}
                      alt={campaign.title || ''}
                      fill
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-default-100 rounded-lg flex items-center justify-center">
                      <Heart className="text-default-300" size={40} />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Chip size="sm" color={status.color} variant="flat">
                          {status.label}
                        </Chip>
                        <Chip size="sm" variant="flat">
                          {campaign.slug?.toUpperCase()}
                        </Chip>
                      </div>
                      <h2 className="text-xl font-semibold">
                        {campaign.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-default-500 text-sm line-clamp-2">
                    {campaign.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">
                        {formatMoney(currentAmountCents)}
                      </span>
                      <span className="text-default-500">
                        de {formatMoney(goalAmountCents)}
                      </span>
                    </div>
                    <Progress value={progress} color="primary" />
                    <p className="text-sm text-default-500">
                      {progress}% da meta atingida
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              icon={TrendingUp}
              label="Total arrecadado"
              value={formatMoney(currentAmountCents)}
            />
            <StatsCard
              icon={Wallet}
              label="Disponível para saque"
              value={formatMoney(transactionData?.summary?.balanceCents ?? 0)}
              color="success"
            />
            <StatsCard
              icon={Users}
              label="Doações recebidas"
              value={(campaign.donationsCount ?? 0).toString()}
            />
            <StatsCard
              icon={Calendar}
              label="Dias restantes"
              value={campaign.expiresAt ? '50' : '∞'}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              as={Link}
              href={`/profile/campaigns/${id}/edit`}
              variant="flat"
              startContent={<Pencil size={18} />}
            >
              Editar campanha
            </Button>
            <Button
              as={Link}
              href={`/profile/campaigns/${id}/statement`}
              variant="flat"
              startContent={<Receipt size={18} />}
            >
              Ver extrato
            </Button>
            <Button
              as={Link}
              href={`/profile/campaigns/${id}/thank-donors`}
              variant="flat"
              color="secondary"
              startContent={<Heart size={18} />}
            >
              Agradecer doadores
            </Button>
            <Button
              as={Link}
              href={`/profile/campaigns/${id}/updates`}
              variant="flat"
              startContent={<Megaphone size={18} />}
            >
              Postar atualização
            </Button>
            {currentAmountCents > 0 && (
              <Button
                as={Link}
                href={`/profile/campaigns/${id}/withdrawals`}
                color="primary"
                startContent={<Wallet size={18} />}
              >
                Solicitar saque
              </Button>
            )}
          </div>

          <Divider />

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Doações recentes</h3>
              {recentDonations.some((d) => !d.thanked && !d.isAnonymous) && (
                <Button
                  as={Link}
                  href={`/profile/campaigns/${id}/thank-donors`}
                  size="sm"
                  variant="flat"
                  color="primary"
                  startContent={<Heart size={16} />}
                >
                  Ver todos os doadores
                </Button>
              )}
            </div>
            <RecentDonationsList donations={recentDonations} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CampaignDashboardPage;
