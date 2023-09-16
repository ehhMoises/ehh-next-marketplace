import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
import { NavigationGrower } from '../../components/Navigation';
import { BrandTable } from '../../components/brands/Table';
import { applyAuthorizationOperations } from '@/lib/auth-checking';

const BrandPage: FC = async () => {
  const me = await applyAuthorizationOperations();

  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col w-full">
        <MainNavigationHeader me={me} />
        <NavigationGrower />
        <BrandTable />
      </section>
    </main>
  );
};

export default BrandPage;
