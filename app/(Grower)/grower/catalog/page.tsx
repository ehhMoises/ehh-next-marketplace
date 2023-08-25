import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
import { NavigationMenuRetailer } from '../../components/Navigation';
import { ProductCatalogTable } from '../../components/ProductCatalogTable';
import { Button } from '@/components/ui/button';

const GrowerCatalog: FC = () => (
  <main className="flex min-h-screen">
    <section className="flex flex-col w-full">
      <MainNavigationHeader />
      <NavigationMenuRetailer />
      <div className="p-4 pt-0">
        <div className="flex justify-end mb-4">
          <Button>Create</Button>
        </div>

        <ProductCatalogTable />
      </div>
    </section>
  </main>
);

export default GrowerCatalog;
