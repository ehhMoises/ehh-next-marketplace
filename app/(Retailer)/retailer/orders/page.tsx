import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
import { NavigationMenuRetailer } from '../../components/Navigation';
import { ProductCatalogTable } from '../../components/ProductCatalogTable';

const OrdersRetailer: FC = () => (
  <main className="flex min-h-screen">
    <section className="flex flex-col w-full">
      <MainNavigationHeader />
      <NavigationMenuRetailer />
      <div className="p-4 pt-0">
        <ProductCatalogTable />
      </div>
    </section>
  </main>
);

export default OrdersRetailer;
