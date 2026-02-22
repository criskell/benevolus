import { ProfileSidebar } from '../profile-sidebar';
import { NotificationsList } from './notifications-list';

const NotificationsPage = () => {
  const userData = {
    name: 'Cristiano',
    followedCampaigns: 0,
    donationsCount: 3,
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
          <NotificationsList />
        </main>
      </div>
    </div>
  );
};

export default NotificationsPage;
