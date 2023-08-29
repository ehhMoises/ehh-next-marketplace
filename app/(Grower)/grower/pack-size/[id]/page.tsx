import { NavigationGrower } from '@/app/(Grower)/components/Navigation';
import { IParamsProps } from '@/app/interfaces';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
const PackSizeDetail: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col w-full">
        <MainNavigationHeader />
        <NavigationGrower />
        <div className="p-4 pt-0">Pack Size detail</div>
      </section>
    </main>
  );
};

export default PackSizeDetail;
