import { NavigationGrower } from '@/app/(Grower)/components/Navigation';
import { Grade } from '@/app/(Grower)/components/grades/Form';
import { IParamsProps } from '@/app/interfaces';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
const GradeDetail: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col w-full">
        <MainNavigationHeader />
        <NavigationGrower />
        <Grade params={params} />
      </section>
    </main>
  );
};

export default GradeDetail;
