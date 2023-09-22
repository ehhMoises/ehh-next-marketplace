import { FC } from 'react';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { applyAuthorizationOperations } from '@/lib/auth-checking';
import { ProfileFormComponent } from '@/components/ProfileForm';
import { NavigationMenuRetailer } from '../../components/Navigation';

const ProfileRetailer: FC = async () => {
  const me = await applyAuthorizationOperations();

  return (
    <main className="flex min-h-screen">
      <section
        className="flex flex-col w-full"
        style={{
          background: 'repeat center/100% url("/fruits/marketplace-dashboard-bg.png")',
        }}
      >
        <MainNavigationHeader me={me} />
        <NavigationMenuRetailer />
        <div className="p-4 pt-0">
          <ProfileFormComponent titleForm="Retailer Profile" />
        </div>
      </section>
    </main>
  );
};

export default ProfileRetailer;
