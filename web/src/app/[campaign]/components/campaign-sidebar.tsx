import { Button, Card, CardBody, Progress } from '@heroui/react';

import { ShieldIcon, StarIcon, ZapIcon } from 'lucide-react';

export function CampaignSidebar() {
  return (
    <aside className="max-w-md w-full sticky top-[80px] h-full space-y-6">
      <Card className="p-12 border border-divider" shadow="none">
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

      <Card className="p-12 border border-divider" shadow="none">
        <div className="space-y-4">
          <div className="flex text-sm font-medium gap-3">
            <div className="size-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 shrink-0">
              <ShieldIcon size={24} className="text-white" />
            </div>

            <div>
              <p className="mb-1">Relacionamento</p>
              <p className="text-zinc-700 text-xs">
                Verificamos a identidade e documentos. É um relacionamento
                transparente para que você possa confiar.
              </p>
            </div>
          </div>

          <div className="flex text-sm font-medium gap-3">
            <div className="size-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 shrink-0">
              <ZapIcon size={24} className="text-white" />
            </div>

            <div>
              <p className="mb-1">Transparência</p>
              <p className="text-zinc-700 text-xs">
                Temos registros das ações através de documentos. Fazemos
                acompanhamento contínuo. Relatórios de transparência.
              </p>
            </div>
          </div>

          <div className="flex text-sm font-medium gap-3">
            <div className="size-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 shrink-0">
              <StarIcon size={24} className="text-white" />
            </div>

            <div>
              <p className="mb-1">Segurança</p>
              <p className="text-zinc-700 text-xs">
                Nosso site utiliza protocolos seguros, criptografia de dados e
                certificados de verificação para proteger sua segurança.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </aside>
  );
}
