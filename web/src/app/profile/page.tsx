import { ProfileSidebar } from './profile-sidebar';
import { ProfilePersonalInfo } from './profile-personal-info';
import { ProfileAddress } from './profile-address';

const ProfilePage = () => {
  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar />

        <main className="flex-1 space-y-8">
          <ProfilePersonalInfo />
          <ProfileAddress />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
