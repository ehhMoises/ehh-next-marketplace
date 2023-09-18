import { FC } from 'react';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { applyAuthorizationOperations } from '@/lib/auth-checking';
import { NavigationGrower } from '../../components/Navigation';
import { GrowerProfileFormComponent } from '../../components/profile/GrowerProfileForm';

const GrowerCatalogDetail: FC = async () => {
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
        <NavigationGrower />
        <div className="p-4 pt-0">
          <GrowerProfileFormComponent />
        </div>
      </section>
    </main>
  );
};

export default GrowerCatalogDetail;
