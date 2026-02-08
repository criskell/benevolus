'use client';

import { use } from 'react';
import { Button, Card, CardBody, Chip, Progress, Divider } from '@heroui/react';
import { ArrowLeft, Pencil, Megaphone, Wallet, ExternalLink, Users, TrendingUp, Calendar, Receipt } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { ProfileSidebar } from '../../components/profile-sidebar';
import { RecentDonationsList } from './components/recent-donations-list';
import { StatsCard } from './components/stats-card';
import { formatMoney } from '@/lib/utils/format-money';

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
  availableBalanceCents: number;
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
};

const statusConfig: Record<CampaignStatus, { label: string; color: 'success' | 'warning' | 'danger' | 'default' }> = {
  approved: { label: 'Ativa', color: 'success' },
  pending: { label: 'Em análise', color: 'warning' },
  rejected: { label: 'Rejeitada', color: 'danger' },
  finished: { label: 'Finalizada', color: 'default' },
};

export default function CampaignDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const userData = {
    name: 'Cristiano',
    followedCampaigns: 0,
    donationsCount: 3,
  };

  const campaign: CampaignDetails = {
    id,
    slug: 'ajuda-para-maria',
    title: 'Ajuda para Maria reconstruir sua casa após enchente',
    description: 'Maria perdeu tudo na enchente que atingiu sua cidade. Precisamos ajudá-la a reconstruir sua casa e sua vida.',
    category: 'EMERGENCIAIS',
    status: 'approved',
    currentAmountCents: 450000,
    goalAmountCents: 1000000,
    availableBalanceCents: 380000,
    donationsCount: 47,
    image: placeholderImage1.src,
    createdAt: '2025-01-05',
    expiresAt: '2025-03-05',
  };

  const recentDonations: Donation[] = [
    { id: '1', donorName: 'João Silva', amountCents: 5000, createdAt: '2025-01-14T10:30:00', isAnonymous: false },
    { id: '2', donorName: null, amountCents: 10000, createdAt: '2025-01-14T09:15:00', isAnonymous: true },
    { id: '3', donorName: 'Maria Santos', amountCents: 2500, createdAt: '2025-01-13T18:45:00', isAnonymous: false },
    { id: '4', donorName: 'Pedro Oliveira', amountCents: 15000, createdAt: '2025-01-13T14:20:00', isAnonymous: false },
    { id: '5', donorName: null, amountCents: 5000, createdAt: '2025-01-12T11:00:00', isAnonymous: true },
  ];

  const progress = Math.round((campaign.currentAmountCents / campaign.goalAmountCents) * 100);
  const status = statusConfig[campaign.status];

  const menuItems = [
    { label: 'Informações pessoais', active: false },
    { label: 'Comunicação', active: false },
    { label: 'Configurações', active: false },
  ];

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar
          userName={userData.name}
          followedCampaigns={userData.followedCampaigns}
          donationsCount={userData.donationsCount}
          menuItems={menuItems}
        />

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
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Chip size="sm" color={status.color} variant="flat">
                          {status.label}
                        </Chip>
                        <Chip size="sm" variant="flat">
                          {campaign.category}
                        </Chip>
                      </div>
                      <h2 className="text-xl font-semibold">{campaign.title}</h2>
                    </div>
                  </div>
                  <p className="text-default-500 text-sm line-clamp-2">{campaign.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{formatMoney(campaign.currentAmountCents)}</span>
                      <span className="text-default-500">de {formatMoney(campaign.goalAmountCents)}</span>
                    </div>
                    <Progress value={progress} color="primary" />
                    <p className="text-sm text-default-500">{progress}% da meta atingida</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              icon={TrendingUp}
              label="Total arrecadado"
              value={formatMoney(campaign.currentAmountCents)}
            />
            <StatsCard
              icon={Wallet}
              label="Disponível para saque"
              value={formatMoney(campaign.availableBalanceCents)}
              color="success"
            />
            <StatsCard
              icon={Users}
              label="Doações recebidas"
              value={campaign.donationsCount.toString()}
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
              href={`/profile/campaigns/${id}/updates`}
              variant="flat"
              startContent={<Megaphone size={18} />}
            >
              Postar atualização
            </Button>
            {campaign.availableBalanceCents > 0 && (
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
            <h3 className="text-lg font-semibold mb-4">Doações recentes</h3>
            <RecentDonationsList donations={recentDonations} />
          </div>
        </main>
      </div>
    </div>
  );
}
