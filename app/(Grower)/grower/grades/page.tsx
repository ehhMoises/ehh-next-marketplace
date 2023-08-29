'use client';

import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
import { NavigationGrower } from '../../components/Navigation';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { GradeTable } from '../../components/grades/Table';

const GradePage: FC = () => {
  const router = useRouter();
  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col w-full">
        <MainNavigationHeader />
        <NavigationGrower />
        <div className="p-4 pt-0">
          <div className="flex justify-end mb-4">
            <Button onClick={() => router.push('/grower/grades/new')}>Create</Button>
          </div>

          <GradeTable />
        </div>
      </section>
    </main>
  );
};

export default GradePage;