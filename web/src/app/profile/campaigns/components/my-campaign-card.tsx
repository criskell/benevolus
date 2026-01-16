'use client';

import { Card, CardBody, Chip, Progress, Button, Image, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { MoreVertical, Eye, Pencil, BarChart3, Megaphone, Wallet } from 'lucide-react';
import Link from 'next/link';
import { formatMoney } from '@/lib/utils/format-money';

type CampaignStatus = 'approved' | 'pending' | 'rejected' | 'finished';

type MyCampaign = {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: CampaignStatus;
  currentAmountCents: number;
  goalAmountCents: number;
  donationsCount: number;
  image: string;
  createdAt: string;
};

type MyCampaignCardProps = {
  campaign: MyCampaign;
};

const statusConfig: Record<CampaignStatus, { label: string; color: 'success' | 'warning' | 'danger' | 'default' }> = {
  approved: { label: 'Ativa', color: 'success' },
  pending: { label: 'Em análise', color: 'warning' },
  rejected: { label: 'Rejeitada', color: 'danger' },
  finished: { label: 'Finalizada', color: 'default' },
};

export const MyCampaignCard = ({ campaign }: MyCampaignCardProps) => {
  const progress = Math.round((campaign.currentAmountCents / campaign.goalAmountCents) * 100);
  const status = statusConfig[campaign.status];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardBody className="p-0">
        <div className="relative w-full aspect-video">
          <Image
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
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
          <Chip size="sm" variant="flat" className="mb-2">
            {campaign.category}
          </Chip>
          <Link href={`/profile/campaigns/${campaign.id}`}>
            <h3 className="text-lg font-semibold hover:text-primary cursor-pointer line-clamp-2">
              {campaign.title}
            </h3>
          </Link>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm text-default-500">
              <span>{progress}% arrecadado</span>
              <span>{campaign.donationsCount} doações</span>
            </div>
            <Progress value={progress} color="primary" />
            <div className="flex justify-between text-sm">
              <span className="font-medium">{formatMoney(campaign.currentAmountCents)}</span>
              <span className="text-default-500">de {formatMoney(campaign.goalAmountCents)}</span>
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
            {campaign.status === 'approved' && campaign.currentAmountCents > 0 && (
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
