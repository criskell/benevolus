'use client';

import { Avatar, Button, Card, CardBody } from '@heroui/react';
import {
  Bookmark,
  CameraIcon,
  Heart,
  Megaphone,
  User,
  CreditCard,
  Bell,
  Receipt,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';
import { useGetProfile } from '@/lib/http/generated/hooks/useGetProfile';
import { useUploadAvatar } from '@/hooks/use-upload-avatar';
import { useRef } from 'react';

const navigationItems = [
  { label: 'Minhas Campanhas', href: '/profile/campaigns', icon: Megaphone },
  { label: 'Campanhas que Sigo', href: '/profile/followed-campaigns', icon: Bookmark },
  { label: 'Minhas Doações', href: '/profile/donations', icon: Heart },
  { label: 'Extrato', href: '/profile/statement', icon: Receipt },
  { label: 'Notificações', href: '/profile/notifications', icon: Bell },
  { label: 'Meus Cartões', href: '/profile/cards', icon: CreditCard },
  { label: 'Meus Dados', href: '/profile', icon: User },
];

export const ProfileSidebar = () => {
  const { data: profile } = useGetProfile();
  const { mutate: uploadAvatar, isPending: isUploading } = useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/profile') {
      return pathname === '/profile';
    }

    return pathname.startsWith(href);
  };

  return (
    <aside className="w-80 shrink-0 space-y-6">
      <h1 className="text-2xl font-semibold">Perfil</h1>

      <div className="relative inline-block">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              uploadAvatar(file);
            }
          }}
        />
        <Avatar
          src={profile?.avatarUrl ?? undefined}
          name={profile?.name}
          getInitials={getUserNameInitials}
          className="w-32 h-32 text-4xl"
          isBordered
          color={isUploading ? 'primary' : 'default'}
        />
        <Button
          isIconOnly
          size="sm"
          radius="full"
          className="absolute bottom-0 right-0 bg-primary text-white shadow-md z-10"
          onClick={() => fileInputRef.current?.click()}
          isLoading={isUploading}
        >
          <CameraIcon size={18} />
        </Button>
      </div>

      <p className="text-lg font-medium">{profile?.name}</p>

      <div className="space-y-3">
        <Card className="bg-primary text-white">
          <CardBody className="p-4">
            <p className="text-2xl font-bold">
              {profile?.favoriteCampaignsCount ?? 0}
            </p>
            <p className="text-sm opacity-90">Vaquinhas que sigo</p>
          </CardBody>
        </Card>

        <Card className="bg-primary text-white">
          <CardBody className="p-4">
            <p className="text-2xl font-bold">{profile?.donationsCount ?? 0}</p>
            <p className="text-sm opacity-90">Doações que fiz</p>
          </CardBody>
        </Card>
      </div>

      <nav className="space-y-1">
        {navigationItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <div key={item.href} className="relative">
              {active && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
              )}
              <Button
                as={Link}
                href={item.href}
                variant="light"
                className={`w-full justify-start ${
                  active ? 'text-primary font-medium' : 'text-default-600'
                }`}
                radius="sm"
                startContent={<Icon size={18} />}
              >
                {item.label}
              </Button>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
