'use client';

import { Avatar, Button, Card, CardBody } from '@heroui/react';
import { CameraIcon } from 'lucide-react';
import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';

type ProfileSidebarProps = {
  userName: string;
  followedCampaigns: number;
  donationsCount: number;
  menuItems: Array<{ label: string; active: boolean }>;
};

export const ProfileSidebar = ({
  userName,
  followedCampaigns,
  donationsCount,
  menuItems,
}: ProfileSidebarProps) => {
  return (
    <aside className="w-80 shrink-0 space-y-6">
      <h1 className="text-2xl font-semibold">Perfil</h1>

      {/* Avatar */}
      <div className="relative inline-block">
        <Avatar
          name={userName}
          getInitials={getUserNameInitials}
          className="w-32 h-32 text-4xl"
        />
        <Button
          isIconOnly
          size="sm"
          radius="full"
          className="absolute bottom-0 right-0 bg-primary text-white shadow-md"
        >
          <CameraIcon size={18} />
        </Button>
      </div>

      <p className="text-lg font-medium">{userName}</p>

      {/* Estatísticas */}
      <div className="space-y-3">
        <Card className="bg-primary text-white">
          <CardBody className="p-4">
            <p className="text-2xl font-bold">{followedCampaigns}</p>
            <p className="text-sm opacity-90">Vaquinhas que sigo</p>
          </CardBody>
        </Card>

        <Card className="bg-primary text-white">
          <CardBody className="p-4">
            <p className="text-2xl font-bold">{donationsCount}</p>
            <p className="text-sm opacity-90">Desfechos que doei</p>
          </CardBody>
        </Card>
      </div>

      {/* Menu de navegação */}
      <nav className="space-y-1">
        {menuItems.map((item, index) => (
          <div key={index} className="relative">
            {item.active && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
            )}
            <Button
              variant="light"
              className={`w-full justify-start ${
                item.active
                  ? 'text-primary font-medium'
                  : 'text-default-600'
              }`}
              radius="sm"
            >
              {item.label}
            </Button>
          </div>
        ))}
      </nav>
    </aside>
  );
};
