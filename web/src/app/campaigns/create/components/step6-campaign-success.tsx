'use client';

import { Button, Card, CardBody, Chip } from '@heroui/react';

interface Step6CampaignSuccessProps {
  campaignTitle: string;
  campaignGoal: number;
}

export function Step6CampaignSuccess({
  campaignTitle,
  campaignGoal,
}: Step6CampaignSuccessProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">
          Sua vaquinha foi criada! É hora de divulgar!
        </h2>
        <p className="text-default-500 text-lg">
          Agora é só compartilhar e começar a arrecadar! Envie o link para amigos e familiares e veja sua vaquinha ganhar força.
        </p>
      </div>

      <div className="flex justify-center">
        <Card className="w-full max-w-sm shadow-lg">
          <CardBody className="p-6 space-y-4">
            <div className="bg-gradient-to-br from-primary to-primary/70 rounded-lg h-32 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white text-sm font-semibold">Seu apoio pode mudar tudo!</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold">{campaignTitle}</h3>
              <p className="text-sm text-default-500">ID: 5857894</p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-default-500">Meta</p>
                <p className="text-lg font-semibold text-primary">
                  R$ {(campaignGoal / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <Chip color="primary" variant="flat" size="sm">
                Ativa
              </Chip>
            </div>

            <p className="text-sm text-default-500 break-all">5857894@vakinha.com.br</p>
          </CardBody>
        </Card>
      </div>

      <div className="flex gap-3 justify-center">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`h-3 rounded-full ${
                i <= 2 ? 'bg-primary' : i === 3 ? 'bg-primary/50' : 'bg-default-200'
              }`}
              style={{ width: '12px' }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Button
          fullWidth
          color="primary"
          size="lg"
          className="font-semibold"
        >
          Ver minha vaquinha
        </Button>
      </div>

      <div className="bg-default-50 rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-bold">Dicas de como destacar sua vaquinha</h3>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="text-2xl">💙</div>
            <div>
              <h4 className="font-semibold mb-1">Compartilhe sua chave Pix</h4>
              <p className="text-sm text-default-500">
                Compartilhe sua chave Pix exclusiva para transmitir confiança e contabilizar doações direto na sua meta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
