'use client';

import { Card } from '@heroui/card';
import { Chip, Avatar, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';
import placeholderImage1 from '@/assets/images/placeholder1.jpg';

export function CampaignHeader() {
  return (
    <div className="space-y-6">
      {/* Creator Info & Title */}
      <Card className="p-6 md:p-8 border border-default-200" shadow="none">
        <div className="flex items-start gap-4 mb-6">
          <Avatar
            name="Fulana"
            getInitials={getUserNameInitials}
            className="flex-shrink-0 ring-2 ring-primary/20"
            size="lg"
            classNames={{
              base: "bg-gradient-to-br from-primary to-primary-600",
              name: "text-white font-semibold"
            }}
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <p className="font-semibold text-foreground">Fulana Santos</p>
              <Icon icon="solar:verified-check-bold" width={20} className="text-primary flex-shrink-0" />
            </div>
            <p className="text-sm text-default-600">Criou esta campanha há 5 dias</p>
          </div>

          {/* Follow Button - Desktop */}
          <Button
            variant="bordered"
            size="sm"
            startContent={<Icon icon="solar:bookmark-bold" width={18} />}
            className="hidden md:flex border-default-300 hover:border-primary hover:text-primary transition-colors"
          >
            Seguir
          </Button>
        </div>

        {/* Campaign Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
          Campanha para Fulana, mãe solo que cria sozinha seus gêmeos prematuros
        </h1>

        {/* Verification Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Chip 
            color="success" 
            variant="flat"
            size="sm"
            startContent={<Icon icon="solar:shield-check-bold" width={16} />}
            classNames={{
              base: "font-semibold"
            }}
          >
            Campanha verificada
          </Chip>
          <Chip 
            color="primary" 
            variant="flat"
            size="sm"
            startContent={<Icon icon="solar:document-text-bold" width={16} />}
            classNames={{
              base: "font-semibold"
            }}
          >
            Documentos verificados
          </Chip>
        </div>

        {/* Campaign Stats */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-default-600">
          <div className="flex items-center gap-2">
            <Icon icon="solar:heart-bold" width={20} className="text-rose-500" />
            <span className="font-medium">1.234 curtidas</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Icon icon="solar:users-group-rounded-bold" width={20} className="text-primary" />
            <span className="font-medium">567 doadores</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Icon icon="solar:chat-round-dots-bold" width={20} className="text-amber-500" />
            <span className="font-medium">89 comentários</span>
          </div>
        </div>

        {/* Follow Button - Mobile */}
        <Button
          variant="bordered"
          size="md"
          fullWidth
          startContent={<Icon icon="solar:bookmark-bold" width={18} />}
          className="md:hidden mt-6 border-default-300 hover:border-primary hover:text-primary transition-colors"
        >
          Seguir campanha
        </Button>
      </Card>

      {/* Main Campaign Image */}
      <Card className="p-0 overflow-hidden border border-default-200" shadow="none">
        <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden bg-default-100">
          <img
            src={placeholderImage1.src}
            alt="Imagem principal da campanha"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </Card>
    </div>
  );
}
