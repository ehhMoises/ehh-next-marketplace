import { NavigationGrower } from '@/app/(Grower)/components/Navigation';
import { BrandsForm } from '@/app/(Grower)/components/brands/Form';
import { IParamsProps } from '@/app/interfaces';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
const BrandDetail: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col w-full">
        <MainNavigationHeader />
        <NavigationGrower />
        <BrandsForm params={params} />
      </section>
    </main>
  );
};

export default BrandDetail;
