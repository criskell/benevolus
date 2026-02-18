'use client';

import { useState } from 'react';
import { Card, CardBody, Button, Chip } from '@heroui/react';
import { Bell, Check, Trash2, Heart, Megaphone, DollarSign, AlertCircle } from 'lucide-react';
import { ProfileSidebar } from '../profile-sidebar';

type NotificationType = 'donation' | 'campaign' | 'system' | 'withdrawal';

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
};

const notificationIcons: Record<NotificationType, React.ReactNode> = {
  donation: <Heart size={20} className="text-pink-500" />,
  campaign: <Megaphone size={20} className="text-blue-500" />,
  withdrawal: <DollarSign size={20} className="text-green-500" />,
  system: <AlertCircle size={20} className="text-orange-500" />,
};

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

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `há ${diffMins} min`;
    } else if (diffHours < 24) {
      return `há ${diffHours}h`;
    } else if (diffDays < 7) {
      return `há ${diffDays}d`;
    } else {
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }
  };

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
                <Card
                  key={notification.id}
                  className={`${
                    !notification.isRead
                      ? 'border-2 border-primary/30 bg-primary/5'
                      : ''
                  } hover:shadow-md transition-shadow`}
                >
                  <CardBody className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {notificationIcons[notification.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3
                            className={`text-base font-semibold ${
                              !notification.isRead ? 'text-foreground' : 'text-default-700'
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                          )}
                        </div>
                        <p className="text-sm text-default-600 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-default-400">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          <div className="flex gap-2">
                            {!notification.isRead && (
                              <Button
                                size="sm"
                                variant="flat"
                                color="primary"
                                onPress={() => markAsRead(notification.id)}
                                className="text-xs"
                              >
                                Marcar como lida
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="light"
                              color="danger"
                              isIconOnly
                              onPress={() => deleteNotification(notification.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default NotificationsPage;
