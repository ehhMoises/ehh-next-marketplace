import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
import { MyOrdersTable } from '../components/MyOrdersTable';
import { NavigationMenuRetailer } from '../components/Navigation';

const HomeRetailer: FC = () => (
  <main className="flex min-h-screen">
    <section className="flex flex-col w-full">
      <MainNavigationHeader />
      <NavigationMenuRetailer />
      <div className="p-4 pt-0">
        <MyOrdersTable />
      </div>
    </section>
  </main>
);

export default HomeRetailer;
