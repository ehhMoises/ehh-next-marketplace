import { FC } from 'react';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { NavigationGrower } from '../../components/Navigation';
import { PackStyleTable } from '../../components/pack-styles/Table';
import { applyAuthorizationOperations } from '@/lib/auth-checking';

const PackStyle: FC = async () => {
  const me = await applyAuthorizationOperations();

  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col w-full">
        <MainNavigationHeader me={me} />
        <NavigationGrower />
        <PackStyleTable />
      </section>
    </main>
  );
};

export default PackStyle;
