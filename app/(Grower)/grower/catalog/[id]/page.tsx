import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
import { NavigationGrower } from '../../../components/Navigation';
import { IParamsProps } from '@/app/interfaces';
import { CatalogForm } from '@/app/(Grower)/components/catalog/CatalogForm';

const GrowerCatalogDetail: FC<IParamsProps> = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col w-full">
        <MainNavigationHeader />
        <NavigationGrower />
        <div className="p-4 pt-0">
          <CatalogForm params={params} />
        </div>
      </section>
    </main>
  );
};

export default GrowerCatalogDetail;
