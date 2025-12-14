import { Badge, Card } from '@heroui/react';

export function CampaignUpdates() {
  return (
    <Card className="p-12 border border-divider" shadow="none">
      <div className="text-lg font-semibold mb-6 flex items-center gap-4">
        Atualizações
        <Badge content="0"> </Badge>
      </div>

      <p className="text-center text-zinc-500">
        Por enquanto não temos atualizações desta campanha. <br /> Fique de
        olho, atualizações serão sempre divulgadas.
      </p>
    </Card>
  );
}
