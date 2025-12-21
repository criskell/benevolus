'use client';

import { Textarea } from '@heroui/react';

interface Step4CampaignHistoryProps {
  history: string;
  onHistoryChange: (value: string) => void;
}

export function Step4CampaignHistory({
  history,
  onHistoryChange,
}: Step4CampaignHistoryProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Conte sua <span className="text-primary">história</span>
        </h2>
        <p className="text-default-500">
          Explique o motivo pelo qual você precisa arrecadar doações, como vai utilizar o valor
          arrecadado, e o quão importante é receber doações.
        </p>
      </div>

      <div>
        <Textarea
          label="Sua história"
          placeholder="Ex.: Eu sou o João, e criei essa vaquinha pois preciso arrecadar R$13.000,00 para comprar uma prótese para minha filha Luiza que sofreu um acidente. Para saber mais da nossa história você pode seguir a nossa página no Instagram: @luiza_protese."
          value={history}
          onValueChange={onHistoryChange}
          minRows={8}
          isRequired
          classNames={{
            label: 'text-sm font-medium',
          }}
        />
      </div>
    </div>
  );
}
