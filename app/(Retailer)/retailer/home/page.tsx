import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
import { NavigationMenuRetailer } from '../../components/Navigation';
import { OrdersCards } from '../../components/OrdersCards';
import { MyOrdersTable } from '@/components/MyOrdersTable';

const HomeRetailer: FC = () => (
  <main className="flex min-h-screen">
    <section className="flex flex-col w-full">
      <MainNavigationHeader />
      <NavigationMenuRetailer />
      <div className="px-4">
        <OrdersCards />
        <MyOrdersTable />
      </div>
    </section>
  </main>
);

export default HomeRetailer;
