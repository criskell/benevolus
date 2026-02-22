'use client';

import { Card, CardBody, Button } from '@heroui/react';
import { Heart, Megaphone, DollarSign, AlertCircle, Trash2 } from 'lucide-react';

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

type NotificationItemProps = {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
};

const NotificationItem = ({ notification, onMarkAsRead, onDelete }: NotificationItemProps) => {
  return (
    <Card
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
                    onPress={() => onMarkAsRead(notification.id)}
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
                  onPress={() => onDelete(notification.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export { NotificationItem, type Notification, type NotificationType };
