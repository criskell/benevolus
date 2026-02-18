'use client';

import { Badge, Card, CardBody, Button } from '@heroui/react';
import { ArrowLeftIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { ProfileSidebar } from '../../profile-sidebar';
import { formatMoney } from '@/lib/utils/format-money';
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
  description?: string;
  campaignSlug?: string;
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

const DonationDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const donationId = params.id as string;

  const userData = {
    name: 'Cristiano',
    followedCampaigns: 0,
    donationsCount: 3,
  };

  // Mock data - em produção, buscar do backend
  const mockDonations: Record<string, Donation> = {
    '1': {
      id: '1',
      campaignTitle: 'Depois de ser atacada com ácido, ela luta para recomeçar sua vida',
      category: 'EMERGENCIAIS',
      amount: 1500,
      paymentMethod: 'PIX',
      date: '12/12/2025',
      status: 'approved',
      images: [placeholderImage1.src, placeholderImage2.src],
      description: 'Sua doação ajudou Maria a recomeçar sua vida após um ataque com ácido. Os fundos foram utilizados para tratamentos médicos e apoio psicológico.',
      campaignSlug: 'maria-ataque-acido',
    },
    '2': {
      id: '2',
      campaignTitle: 'Ela cuida 24h do marido tetraplégico, agora pede ajuda',
      category: 'MORADIA',
      amount: 3000,
      paymentMethod: 'PIX',
      date: '11/12/2025',
      status: 'approved',
      images: [placeholderImage1.src, placeholderImage2.src],
      description: 'Sua contribuição ajudou Ana a adaptar sua casa para melhor cuidar de seu marido tetraplégico.',
      campaignSlug: 'ana-marido-tetraplegico',
    },
    '3': {
      id: '3',
      campaignTitle: 'Pai que teve as mãos deformadas em explosão precisa de ajuda',
      category: 'SAÚDE',
      amount: 5000,
      paymentMethod: 'PIX',
      date: '10/12/2025',
      status: 'approved',
      images: [placeholderImage1.src, placeholderImage2.src],
      description: 'Sua doação está ajudando José com os custos de cirurgias reconstrutivas e fisioterapia.',
      campaignSlug: 'jose-maos-deformadas',
    },
    '4': {
      id: '4',
      campaignTitle: 'Moto boy que salvou criança de um sequestro pede ajuda',
      category: 'MORADIA',
      amount: 3000,
      paymentMethod: 'PIX',
      date: '09/12/2025',
      status: 'approved',
      images: [placeholderImage1.src, placeholderImage2.src],
      description: 'Sua contribuição ajudou Carlos, o herói moto boy, a melhorar sua moradia.',
      campaignSlug: 'carlos-motoboy-heroi',
    },
    '5': {
      id: '5',
      campaignTitle: 'Vaquinha para a família da Laura, que cuida da mãe com Alzheimer',
      category: 'SAÚDE',
      amount: 5000,
      paymentMethod: 'PIX',
      date: '08/12/2025',
      status: 'approved',
      images: [placeholderImage1.src, placeholderImage2.src],
      description: 'Sua doação está ajudando Laura a custear o tratamento e cuidados de sua mãe com Alzheimer.',
      campaignSlug: 'laura-mae-alzheimer',
    },
    '6': {
      id: '6',
      campaignTitle: 'Vaquinha para Larissa, mãe solo que cria 4 filhos',
      category: 'GERAÇÃO DE RENDA',
      amount: 10000,
      paymentMethod: 'PIX',
      date: '07/12/2025',
      status: 'approved',
      images: [placeholderImage1.src, placeholderImage2.src],
      description: 'Sua doação ajudou Larissa a iniciar seu próprio negócio para sustentar seus 4 filhos.',
      campaignSlug: 'larissa-mae-solo',
    },
  };

  const donation = mockDonations[donationId];

  if (!donation) {
    return (
      <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
        <div className="text-center py-10">
          <h1 className="text-2xl font-semibold mb-4">Doação não encontrada</h1>
          <Button
            variant="flat"
            color="primary"
            startContent={<ArrowLeftIcon size={18} />}
            onPress={() => router.push('/profile/donations')}
          >
            Voltar para minhas doações
          </Button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: 'Informações pessoais', active: false },
    { label: 'Comunicação', active: false },
    { label: 'Configurações', active: false },
  ];

  const formattedAmount = formatMoney(donation.amount);

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
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="light"
              isIconOnly
              onPress={() => router.back()}
            >
              <ArrowLeftIcon size={20} />
            </Button>
            <h1 className="text-2xl font-semibold">Detalhes da Doação</h1>
          </div>

          <Card className="overflow-hidden">
            <div className="relative h-96 flex">
              <div className="w-1/2 h-full overflow-hidden">
                <img
                  src={donation.images[0]}
                  alt={donation.campaignTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-1/2 h-full overflow-hidden">
                <img
                  src={donation.images[1] || donation.images[0]}
                  alt={donation.campaignTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <CardBody className="p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Badge variant="flat" className="mb-3">
                    {donation.category}
                  </Badge>
                  <h2 className="text-2xl font-semibold mb-4">
                    {donation.campaignTitle}
                  </h2>
                  {donation.description && (
                    <p className="text-default-600 mb-6">{donation.description}</p>
                  )}
                </div>
              </div>

              <div className="border-t border-divider pt-6">
                <h3 className="text-lg font-semibold mb-4">Informações da Doação</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-default-500 mb-1">Valor doado</p>
                    <p className="text-2xl font-semibold text-primary">
                      R$ {formattedAmount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-default-500 mb-1">Status</p>
                    <Badge
                      color={statusColors[donation.status]}
                      variant="flat"
                    >
                      {statusLabels[donation.status]}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-default-500 mb-1">Forma de pagamento</p>
                    <p className="text-base font-medium">{donation.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-500 mb-1">Data da doação</p>
                    <p className="text-base font-medium">{donation.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-500 mb-1">ID da doação</p>
                    <p className="text-base font-medium font-mono">{donation.id}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-divider pt-6">
                <Button
                  color="primary"
                  variant="flat"
                  onPress={() => {
                    if (donation.campaignSlug) {
                      router.push(`/campaigns/${donation.campaignSlug}`);
                    }
                  }}
                >
                  Ver campanha completa
                </Button>
              </div>
            </CardBody>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DonationDetailPage;
