'use client';

import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
import { NavigationGrower } from '../../components/Navigation';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { PackSizeTable } from '../../components/pack-sizes/Table';

const PackSize: FC = () => {
  const router = useRouter();
  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col w-full">
        <MainNavigationHeader />
        <NavigationGrower />
        <div className="p-4 pt-0">
          <div className="flex justify-end mb-4">
            <Button onClick={() => router.push('/grower/pack-sizes/new')}>Create</Button>
          </div>
          <PackSizeTable />
        </div>
      </section>
    </main>
  );
};

export default PackSize;
