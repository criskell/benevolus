'use client';

import { Card, CardBody, Button, Chip, Spinner } from '@heroui/react';
import { Bell, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useQueryClient } from '@tanstack/react-query';

import { useListNotifications, listNotificationsQueryKey } from '@/lib/http/generated/hooks/useListNotifications';
import { useMarkNotificationAsRead } from '@/lib/http/generated/hooks/useMarkNotificationAsRead';
import { useMarkAllNotificationsAsRead } from '@/lib/http/generated/hooks/useMarkAllNotificationsAsRead';
import { useDeleteNotification } from '@/lib/http/generated/hooks/useDeleteNotification';
import { NotificationItem } from './notification-item';

const NotificationsList = () => {
  const t = useTranslations('notifications_page');
  const queryClient = useQueryClient();

  const { data, isLoading } = useListNotifications();

  const notifications = data?.data ?? [];
  const unreadCount = data?.meta?.unreadCount ?? 0;

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: listNotificationsQueryKey() });
  };

  const { mutate: markAsRead } = useMarkNotificationAsRead({
    mutation: { onSuccess: invalidate },
  });

  const { mutate: markAllAsRead } = useMarkAllNotificationsAsRead({
    mutation: { onSuccess: invalidate },
  });

  const { mutate: deleteNotif } = useDeleteNotification({
    mutation: { onSuccess: invalidate },
  });

  const handleMarkAsRead = (id: string) => {
    markAsRead({ id });
  };

  const handleDelete = (id: string) => {
    deleteNotif({ id });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2 flex items-center gap-2">
            {t('title')}
            {unreadCount > 0 && (
              <Chip color="primary" size="sm">
                {t('new_count', { count: unreadCount })}
              </Chip>
            )}
          </h1>
          <p className="text-sm text-default-500">
            {t('subtitle')}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            color="primary"
            variant="flat"
            startContent={<Check size={18} />}
            onPress={() => markAllAsRead()}
          >
            {t('mark_all_read')}
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : notifications.length === 0 ? (
        <Card>
          <CardBody className="p-12 text-center">
            <Bell size={48} className="mx-auto mb-4 text-default-300" />
            <p className="text-default-500 text-lg">
              {t('empty')}
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </>
  );
};

export { NotificationsList };
