'use client';

import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
import { NavigationGrower } from '../../components/Navigation';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { StockTable } from '../../components/catalog/Table';

const GrowerCatalog: FC = () => {
  const router = useRouter();
  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col w-full">
        <MainNavigationHeader />
        <NavigationGrower />
        <div className="p-4 pt-0">
          <div className="flex justify-end mb-4">
            <Button onClick={() => router.push('/grower/catalog/new')}>Create</Button>
          </div>

          <StockTable />
        </div>
      </section>
    </main>
  );
};

export default GrowerCatalog;
