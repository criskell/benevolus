import placeholderImage1 from '@/assets/images/placeholder1.jpg';
import placeholderImage2 from '@/assets/images/placeholder2.jpg';

import { CampaignCard } from '@/components/campaign/campaign-card';
import type { Campaign } from '@/models/campaign';

import { HeroSection } from './hero-section';
import { CategoryNavigation } from './category-navigation';

const mockedCampaigns: Campaign[] = [
  {
    category: 'SAÚDE',
    title:
      'Fulano luta contra câncer raro e várias metástases, além disso, ainda corre risco de ser despejado da casa onde mora com a mãe',
    daysRemaining: 22,
    progress: 1,
    currentAmount: 48245,
    goalAmount: 5500000,
    images: [placeholderImage1.src, placeholderImage2.src],
  },
  {
    category: 'SAÚDE',
    title:
      'Vaquinha para Fulana, mãe solo que cria sozinha seus gêmeos prematuros',
    daysRemaining: 22,
    progress: 3,
    currentAmount: 169035,
    goalAmount: 6500000,
    images: [placeholderImage1.src, placeholderImage2.src],
  },
  {
    category: 'SAÚDE',
    title:
      'Fulano, bebê de apenas 11 meses, precisa de ajuda para continuar lutando contra leucemia mieloide aguda',
    daysRemaining: 22,
    progress: 1,
    currentAmount: 40706,
    goalAmount: 5000000,
    images: [placeholderImage1.src, placeholderImage2.src],
  },
  {
    category: 'MORADIA',
    title:
      'Avó de 64 anos que perdeu neto de 8 ano e cria um outro com depressão pede ajuda para sair do morro',
    daysRemaining: 22,
    progress: 4,
    currentAmount: 344710,
    goalAmount: 8000000,
    images: [placeholderImage1.src, placeholderImage2.src],
  },
  {
    category: 'SAÚDE',
    title:
      'Criança de 5 anos chora de dor o dia inteiro por causa de crises. Ela precisa urgente de tratamento!',
    daysRemaining: 15,
    progress: 62,
    currentAmount: 6184969,
    goalAmount: 10000000,
    images: [placeholderImage1.src, placeholderImage2.src],
  },
  {
    category: 'MORADIA',
    title:
      'Após amputar as pernas por causa de um câncer agressivo, Dona Fulana sonha em deixar a casa que mora que está condenada e caindo',
    daysRemaining: 15,
    progress: 8,
    currentAmount: 548818,
    goalAmount: 7000000,
    images: [placeholderImage1.src, placeholderImage2.src],
  },
];

export default function Home() {
  return (
    <main className="container mx-auto flex-1 flex flex-col items-center justify-center px-8 my-16 space-y-16">
      <HeroSection />
      <div className="max-w-full">
        <CategoryNavigation />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockedCampaigns.map((campaign, idx) => (
          <CampaignCard campaign={campaign} key={idx} />
        ))}
      </div>
    </main>
  );
}
