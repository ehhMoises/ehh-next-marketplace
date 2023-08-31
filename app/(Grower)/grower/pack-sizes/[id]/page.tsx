import { NavigationGrower } from '@/app/(Grower)/components/Navigation';
import { PackSizeForm } from '@/app/(Grower)/components/pack-sizes/Form';
import { IParamsProps } from '@/app/interfaces';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
const PackSizeDetail: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col w-full">
        <MainNavigationHeader />
        <NavigationGrower />
        <PackSizeForm params={params} />
      </section>
    </main>
  );
};

export default PackSizeDetail;
