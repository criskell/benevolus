'use client';

import { Card } from '@heroui/card';
import { Chip, Avatar, Button } from '@heroui/react';
import { HeartIcon, MessageCircleIcon, UsersIcon, BookmarkIcon } from 'lucide-react';

import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';
import placeholderImage1 from '@/assets/images/placeholder1.jpg';

export function CampaignHeader() {
  return (
    <Card
      className="p-12 border border-divider flex flex-row gap-4"
      shadow="none"
    >
      <Avatar
        name="Fulana"
        getInitials={getUserNameInitials}
        color="primary"
        size="lg"
        className="flex-shrink-0"
      />

      <div>
        <div>
          <h2 className="text-2xl font-semibold max-w-3xl">
            Campanha para Fulana, mãe solo que cria sozinha seus gêmeos
            prematuros
          </h2>
        </div>

        <div>
          <img
            src={placeholderImage1.src}
            alt="Imagem"
            className="rounded-lg h-80 mt-4"
          />
        </div>

        <div className="mt-4">
          <div className="flex gap-4 items-center text-zinc-500 text-sm">
            <span className="inline-flex items-center gap-2">
              <HeartIcon size={20} />
              1.234 curtidas
            </span>

            <span className="inline-flex items-center gap-2">
              <UsersIcon size={20} />
              567 doadores
            </span>

            <span className="inline-flex items-center gap-2">
              <MessageCircleIcon size={20} />
              89 comentários
            </span>
          </div>

          <div className="flex gap-2 items-center mt-4">
            <Chip color="success" size="sm">
              Campanha verificada
            </Chip>
            <Chip color="primary" size="sm">
              Documentos verificados
            </Chip>
          </div>

          <div className="mt-4">
            <Button
              variant="light"
              startContent={<BookmarkIcon size={16} />}
              size="sm"
            >
              Seguir vaquinha para saber das novidades
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
