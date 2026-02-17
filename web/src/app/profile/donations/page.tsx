'use client';

import { useState } from 'react';
import { ProfileSidebar } from '../components/profile-sidebar';
import { DonationsTabs } from './components/donations-tabs';
import { DonationCard } from './components/donation-card';
import placeholderImage1 from '@/assets/images/placeholder1.jpg';
import placeholderImage2 from '@/assets/images/placeholder2.jpg';

type Donation = {
  id: string;
  campaignTitle: string;
  category: string;
  amount: number;
  paymentMethod: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  images: string[];
  isMonthly?: boolean;
};

const DonationsPage = () => {
  const [activeTab, setActiveTab] = useState<'one-time' | 'monthly'>(
    'one-time'
  );

  const userData = {
    name: 'Cristiano',
    followedCampaigns: 0,
    donationsCount: 3,
  };

  const mockDonations: Donation[] = [
    {
      id: '1',
      campaignTitle: 'Depois de ser atacada com ácido, ela luta para...',
      category: 'EMERGENCIAIS',
      amount: 1500,
      paymentMethod: 'PIX',
      date: '12/12/2025',
      status: 'approved',
      images: [placeholderImage1.src, placeholderImage2.src],
    },
    {
      id: '2',
      campaignTitle: 'Ela cuida 24h do marido tetraplégico, agora ped...',
      category: 'MORADIA',
      amount: 3000,
      paymentMethod: 'PIX',
      date: '11/12/2025',
      status: 'approved',
      images: [placeholderImage1.src, placeholderImage2.src],
    },
    {
      id: '3',
      campaignTitle: 'Pai que teve as mãos deformadas em explos...',
      category: 'SAÚDE',
      amount: 5000,
      paymentMethod: 'PIX',
      date: '10/12/2025',
      status: 'approved',
      images: [placeholderImage1.src, placeholderImage2.src],
    },
    {
      id: '4',
      campaignTitle: 'Moto boy que salvou criança de um sequestr...',
      category: 'MORADIA',
      amount: 3000,
      paymentMethod: 'PIX',
      date: '09/12/2025',
      status: 'approved',
      images: [placeholderImage1.src, placeholderImage2.src],
    },
    {
      id: '5',
      campaignTitle: 'Vaquinha para a família da Laura, que cuida da...',
      category: 'SAÚDE',
      amount: 5000,
      paymentMethod: 'PIX',
      date: '08/12/2025',
      status: 'approved',
      images: [placeholderImage1.src, placeholderImage2.src],
    },
    {
      id: '6',
      campaignTitle: 'Vaquinha para Larissa, mãe solo que cria...',
      category: 'GERAÇÃO DE RENDA',
      amount: 10000,
      paymentMethod: 'PIX',
      date: '07/12/2025',
      status: 'approved',
      images: [placeholderImage1.src, placeholderImage2.src],
    },
  ];

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
          <div>
            <h1 className="text-2xl font-semibold mb-2">Minhas Doações</h1>
            <p className="text-sm text-default-500">
              Veja todas suas doações abaixo.
            </p>
          </div>

          <div className="flex gap-8">
            <div className="flex-1 space-y-4">
              <DonationsTabs activeTab={activeTab} onTabChange={setActiveTab} />

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {mockDonations.map((donation) => (
                  <DonationCard key={donation.id} donation={donation} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DonationsPage;
