'use client';

import { Card, CardBody, Chip, Progress, Button, Image, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { MoreVertical, Eye, Pencil, BarChart3, Megaphone, Wallet, ImageOff } from 'lucide-react';
import Link from 'next/link';
import { formatMoney } from '@/lib/utils/format-money';
import type { MyCampaign, CampaignStatus } from './types';

type MyCampaignCardProps = {
  campaign: MyCampaign;
};

const statusConfig: Record<CampaignStatus, { label: string; color: 'success' | 'warning' | 'danger' | 'default' }> = {
  open: { label: 'Ativa', color: 'success' },
  in_review: { label: 'Em análise', color: 'warning' },
  rejected: { label: 'Rejeitada', color: 'danger' },
  finished: { label: 'Finalizada', color: 'default' },
  closed: { label: 'Fechada', color: 'default' },
};

export const MyCampaignCard = ({ campaign }: MyCampaignCardProps) => {
  const goalCents = campaign.goalCents ?? 0;
  const raisedCents = campaign.amountRaisedCents ?? 0;
  const progress = goalCents > 0 ? Math.round((raisedCents / goalCents) * 100) : 0;
  const status = statusConfig[campaign.status];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardBody className="p-0">
        <div className="relative w-full aspect-video">
          {campaign.image ? (
            <Image
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-full object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full bg-default-100 rounded-t-lg flex flex-col items-center justify-center gap-2">
              <ImageOff size={40} className="text-default-300" />
              <span className="text-xs text-default-400">Sem imagem</span>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <Chip size="sm" color={status.color} variant="solid">
              {status.label}
            </Chip>
          </div>
          <div className="absolute top-2 right-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="flat" className="bg-white/80">
                  <MoreVertical size={16} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Ações da campanha">
                <DropdownItem
                  key="view"
                  startContent={<Eye size={16} />}
                  href={`/${campaign.slug}`}
                  as={Link}
                >
                  Ver campanha
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  startContent={<Pencil size={16} />}
                  href={`/profile/campaigns/${campaign.id}/edit`}
                  as={Link}
                >
                  Editar
                </DropdownItem>
                <DropdownItem
                  key="stats"
                  startContent={<BarChart3 size={16} />}
                  href={`/profile/campaigns/${campaign.id}`}
                  as={Link}
                >
                  Ver estatísticas
                </DropdownItem>
                <DropdownItem
                  key="updates"
                  startContent={<Megaphone size={16} />}
                  href={`/profile/campaigns/${campaign.id}/updates`}
                  as={Link}
                >
                  Atualizações
                </DropdownItem>
                <DropdownItem
                  key="withdrawals"
                  startContent={<Wallet size={16} />}
                  href={`/profile/campaigns/${campaign.id}/withdrawals`}
                  as={Link}
                >
                  Saques
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="p-4">
          <Link href={`/profile/campaigns/${campaign.id}`}>
            <h3 className="text-lg font-semibold hover:text-primary cursor-pointer line-clamp-2">
              {campaign.title}
            </h3>
          </Link>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm text-default-500">
              <span>{progress}% arrecadado</span>
              <span>{campaign.donationsCount ?? 0} doações</span>
            </div>
            <Progress value={progress} color="primary" />
            <div className="flex justify-between text-sm">
              <span className="font-medium">{formatMoney(raisedCents)}</span>
              <span className="text-default-500">de {formatMoney(goalCents)}</span>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              as={Link}
              href={`/profile/campaigns/${campaign.id}`}
              variant="flat"
              className="flex-1"
              size="sm"
            >
              Gerenciar
            </Button>
            {campaign.status === 'open' && raisedCents > 0 && (
              <Button
                as={Link}
                href={`/profile/campaigns/${campaign.id}/withdrawals`}
                color="primary"
                size="sm"
              >
                Sacar
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
