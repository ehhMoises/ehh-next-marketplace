import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
import { NavigationGrower } from '../../components/Navigation';
import { GradeTable } from '../../components/grades/Table';
import { applyAuthorizationOperations } from '@/lib/auth-checking';

const GradePage: FC = async () => {
  const me = await applyAuthorizationOperations();

  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col w-full">
        <MainNavigationHeader me={me} />
        <NavigationGrower />
        <GradeTable />
      </section>
    </main>
  );
};

export default GradePage;
