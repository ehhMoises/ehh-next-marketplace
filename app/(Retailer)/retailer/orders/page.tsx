import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
import { OrdersCards } from '../OrdersCards';
import { data } from './data';
import { MyOrdersTable } from '../MyOrdersTable';
import { RetailerChart } from './chart';

const OrdersRetailer: FC = () => (
  <main className="flex min-h-screen">
    <section className="flex flex-col w-full">
      <MainNavigationHeader />
      <div className="p-4">
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

export default OrdersRetailer;
