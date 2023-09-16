import { FC } from 'react';
import { NavigationGrower } from '@/app/(Grower)/components/Navigation';
import { Grade } from '@/app/(Grower)/components/grades/Form';
import { IParamsProps } from '@/app/interfaces';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { applyAuthorizationOperations } from '@/lib/auth-checking';

const GradeDetail: FC<IParamsProps> = async ({ params }: { params: { id: string } }) => {
  const me = await applyAuthorizationOperations();

  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col w-full">
        <MainNavigationHeader me={me} />
        <NavigationGrower />
        <Grade params={params} />
      </section>
    </main>
  );
};

export default GradeDetail;
