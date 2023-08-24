import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
import { data } from '../../lib/data';
import { RetailerChart } from '../../components/Chart';
import { NavigationMenuRetailer } from '../../components/Navigation';
import { OrdersCards } from '../../components/OrdersCards';
import { MyOrdersTable } from '../../components/MyOrdersTable';

const HomeRetailer: FC = () => (
  <main className="flex min-h-screen">
    <section className="flex flex-col w-full">
      <MainNavigationHeader />
      <NavigationMenuRetailer />
      <div className="p-4 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {data.map((item, index) => (
            <OrdersCards key={index} {...item} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <MyOrdersTable />
          <div className="bg-white p-4 flex justify-center">
            <RetailerChart />
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default HomeRetailer;
