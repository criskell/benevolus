'use client';

import { useState } from 'react';
import { Card, CardBody, Button, Chip } from '@heroui/react';
import { Bell, Check } from 'lucide-react';

import { ProfileSidebar } from '../profile-sidebar';
import { NotificationItem, type Notification } from './notification-item';

const NotificationsPage = () => {
  const userData = {
    name: 'Cristiano',
    followedCampaigns: 0,
    donationsCount: 3,
  };

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'donation',
      title: 'Nova doação recebida!',
      message: 'Você recebeu uma doação de R$ 50,00 na campanha "Ajuda para Maria"',
      timestamp: '2025-02-08T10:30:00',
      isRead: false,
    },
    {
      id: '2',
      type: 'campaign',
      title: 'Campanha aprovada',
      message: 'Sua campanha "Tratamento do João" foi aprovada e já está ativa!',
      timestamp: '2025-02-07T15:45:00',
      isRead: false,
    },
    {
      id: '3',
      type: 'withdrawal',
      title: 'Saque processado',
      message: 'Seu saque de R$ 300,00 foi processado com sucesso.',
      timestamp: '2025-02-06T09:20:00',
      isRead: true,
    },
    {
      id: '4',
      type: 'donation',
      title: 'Nova doação recebida!',
      message: 'Você recebeu uma doação de R$ 100,00 na campanha "Reforma escola"',
      timestamp: '2025-02-05T14:10:00',
      isRead: true,
    },
    {
      id: '5',
      type: 'system',
      title: 'Atualização de política',
      message: 'Atualizamos nossa política de privacidade. Clique para saber mais.',
      timestamp: '2025-02-04T11:00:00',
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar
          userName={userData.name}
          followedCampaigns={userData.followedCampaigns}
          donationsCount={userData.donationsCount}
        />

        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                Notificações
                {unreadCount > 0 && (
                  <Chip color="primary" size="sm">
                    {unreadCount} nova{unreadCount > 1 ? 's' : ''}
                  </Chip>
                )}
              </h1>
              <p className="text-sm text-default-500">
                Acompanhe todas as atualizações sobre suas campanhas e doações.
              </p>
            </div>
            {unreadCount > 0 && (
              <Button
                color="primary"
                variant="flat"
                startContent={<Check size={18} />}
                onPress={markAllAsRead}
              >
                Marcar todas como lidas
              </Button>
            )}
          </div>

          {notifications.length === 0 ? (
            <Card>
              <CardBody className="p-12 text-center">
                <Bell size={48} className="mx-auto mb-4 text-default-300" />
                <p className="text-default-500 text-lg">
                  Você não tem notificações no momento.
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default NotificationsPage;
