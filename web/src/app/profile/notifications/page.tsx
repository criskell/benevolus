import { ProfileSidebar } from '../profile-sidebar';
import { NotificationsList } from './notifications-list';

const NotificationsPage = () => {
  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar />

        <main className="flex-1 space-y-6">
          <NotificationsList />
        </main>
      </div>
    </div>
  );
};

export default NotificationsPage;
