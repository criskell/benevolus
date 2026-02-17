'use client';

import { useState } from 'react';
import { Button, Chip, Tabs, Tab } from '@heroui/react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { ProfileSidebar } from '../components/profile-sidebar';
import { MyCampaignCard } from './components/my-campaign-card';
import placeholderImage1 from '@/assets/images/placeholder1.jpg';
import placeholderImage2 from '@/assets/images/placeholder2.jpg';

type CampaignStatus = 'approved' | 'pending' | 'rejected' | 'finished';

type MyCampaign = {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: CampaignStatus;
  currentAmountCents: number;
  goalAmountCents: number;
  donationsCount: number;
  image: string;
  createdAt: string;
};

const statusLabels: Record<CampaignStatus, string> = {
  approved: 'Ativa',
  pending: 'Em análise',
  rejected: 'Rejeitada',
  finished: 'Finalizada',
};

const MyCampaignsPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | CampaignStatus>('all');

  const userData = {
    name: 'Cristiano',
    followedCampaigns: 0,
    donationsCount: 3,
  };

  const mockCampaigns: MyCampaign[] = [
    {
      id: '1',
      slug: 'ajuda-para-maria',
      title: 'Ajuda para Maria reconstruir sua casa após enchente',
      category: 'EMERGENCIAIS',
      status: 'approved',
      currentAmountCents: 450000,
      goalAmountCents: 1000000,
      donationsCount: 47,
      image: placeholderImage1.src,
      createdAt: '2025-01-05',
    },
    {
      id: '2',
      slug: 'tratamento-joao',
      title: 'Tratamento do João - Luta contra o câncer',
      category: 'SAÚDE',
      status: 'approved',
      currentAmountCents: 125000,
      goalAmountCents: 500000,
      donationsCount: 23,
      image: placeholderImage2.src,
      createdAt: '2025-01-10',
    },
    {
      id: '3',
      slug: 'reforma-escola',
      title: 'Reforma da escola comunitária do bairro',
      category: 'EDUCAÇÃO',
      status: 'pending',
      currentAmountCents: 0,
      goalAmountCents: 200000,
      donationsCount: 0,
      image: placeholderImage1.src,
      createdAt: '2025-01-14',
    },
  ];

  const filteredCampaigns =
    activeTab === 'all'
      ? mockCampaigns
      : mockCampaigns.filter((c) => c.status === activeTab);

  const menuItems = [
    { label: 'Informações pessoais', active: false },
    { label: 'Comunicação', active: false },
    { label: 'Configurações', active: false },
  ];

  const getCounts = () => {
    const counts = { all: mockCampaigns.length, approved: 0, pending: 0, rejected: 0, finished: 0 };
    mockCampaigns.forEach((c) => counts[c.status]++);
    return counts;
  };

  const counts = getCounts();

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold mb-2">Minhas Campanhas</h1>
              <p className="text-sm text-default-500">
                Gerencie suas campanhas de arrecadação.
              </p>
            </div>
            <Button
              as={Link}
              href="/campaigns/create"
              color="primary"
              startContent={<Plus size={18} />}
            >
              Nova campanha
            </Button>
          </div>

          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as typeof activeTab)}
          >
            <Tab
              key="all"
              title={
                <div className="flex items-center gap-2">
                  Todas
                  <Chip size="sm" variant="flat">{counts.all}</Chip>
                </div>
              }
            />
            <Tab
              key="approved"
              title={
                <div className="flex items-center gap-2">
                  Ativas
                  <Chip size="sm" variant="flat" color="success">{counts.approved}</Chip>
                </div>
              }
            />
            <Tab
              key="pending"
              title={
                <div className="flex items-center gap-2">
                  Em análise
                  <Chip size="sm" variant="flat" color="warning">{counts.pending}</Chip>
                </div>
              }
            />
            <Tab
              key="finished"
              title={
                <div className="flex items-center gap-2">
                  Finalizadas
                  <Chip size="sm" variant="flat">{counts.finished}</Chip>
                </div>
              }
            />
          </Tabs>

          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-default-500 mb-4">
                {activeTab === 'all'
                  ? 'Você ainda não criou nenhuma campanha.'
                  : `Nenhuma campanha ${statusLabels[activeTab as CampaignStatus].toLowerCase()}.`}
              </p>
              {activeTab === 'all' && (
                <Button as={Link} href="/campaigns/create" color="primary">
                  Criar minha primeira campanha
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCampaigns.map((campaign) => (
                <MyCampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyCampaignsPage;
