import { Card } from '@heroui/react';

import placeholder from '@/assets/images/placeholder1.jpg';

export function CampaignAside() {
  return (
    <aside className="max-w-md w-full">
      <Card className="p-12 border border-divider space-y-6" shadow="none">
        <p className="text-lg font-semibold">Campanha</p>

        <img src={placeholder.src} className="rounded-xl" />

        <p className="text-zinc-500 font-medium">
          Campanha para Fulana, mãe solo que cria sozinha seus gêmeos prematuros
        </p>
      </Card>
    </aside>
  );
}
