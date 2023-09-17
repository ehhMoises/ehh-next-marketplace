import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
import { NavigationGrower } from '../../components/Navigation';
import { PackSizeTable } from '../../components/pack-sizes/Table';
import { applyAuthorizationOperations } from '@/lib/auth-checking';

const PackSize: FC = async () => {
  const me = await applyAuthorizationOperations();

  return (
    <main className="flex min-h-screen">
      <section
        className="flex flex-col w-full"
        style={{
          background: 'no-repeat center/100% url("/fruits/marketplace-dashboard-bg.png")',
        }}
      >
        <MainNavigationHeader me={me} />
        <NavigationGrower />
        <PackSizeTable />
      </section>
    </main>
  );
};

export default PackSize;
