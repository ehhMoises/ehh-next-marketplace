import { NavigationGrower } from '@/app/(Grower)/components/Navigation';
import { PackStyleForm } from '@/app/(Grower)/components/pack-styles/Form';
import { IParamsProps } from '@/app/interfaces';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
const PackStyleDetail: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col w-full">
        <MainNavigationHeader />
        <NavigationGrower />
        <PackStyleForm params={params} />
      </section>
    </main>
  );
};

export default PackStyleDetail;
