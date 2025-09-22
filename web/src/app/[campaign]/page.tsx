'use client';

import { Card, CardBody, CardHeader } from '@heroui/card';
import { Badge, Button, Divider, Progress } from '@heroui/react';
import {
  HeartIcon,
  MessageCircleIcon,
  ShieldIcon,
  UsersIcon,
} from 'lucide-react';

export default function CampaignPage() {
  return (
    <div className="flex-1 my-16 container mx-auto flex gap-16 justify-between">
      <main>
        <Card isBlurred>
          <CardHeader>
            <h2 className="text-2xl font-semibold">
              Campanha para Fulana, mãe solo que cria sozinha seus gêmeos
              prematuros
            </h2>
          </CardHeader>

          <Divider />

          <CardBody>
            <div className="flex gap-2 items-center text-zinc-500 text-sm">
              <span className="inline-flex items-center gap-2">
                <HeartIcon size={20} />
                1.234 curtidas
              </span>

              <span className="inline-flex items-center gap-2">
                <UsersIcon size={20} />
                567 apoiadores
              </span>

              <span className="inline-flex items-center gap-2">
                <MessageCircleIcon size={20} />
                89 mensagens
              </span>
            </div>

            <div className="flex gap-2 items-center mt-2">
              <Badge color="success">Campanha verificada</Badge>
              <Badge color="primary">Documentos verificados</Badge>
            </div>
          </CardBody>
        </Card>
      </main>

      <aside className="max-w-md w-full">
        <Card>
          <CardBody className="p-6 font-medium">
            <div className="text-center mb-6">
              <p className="text-3xl font-bold mb-1">R$ 6.934,51</p>
              <p className="text-sm">de R$ 50.000,00</p>

              <Progress value={14} className="mt-3" />

              <p className="text-xs mt-2">14% concluído</p>
            </div>

            <Button className="w-full" color="primary">
              Doar
            </Button>

            <div className="flex items-center gap-2 text-xs text-zinc-600 mt-4">
              <ShieldIcon size={20} />
              <span>Pagamento protegido pela plataforma</span>
            </div>
          </CardBody>
        </Card>
      </aside>
    </div>
  );
}
