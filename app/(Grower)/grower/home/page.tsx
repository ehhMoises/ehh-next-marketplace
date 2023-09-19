import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
import { NavigationGrower } from '../../components/Navigation';
import { OrdersCards } from '@/app/(Retailer)/components/OrdersCards';
import { applyAuthorizationOperations } from '@/lib/auth-checking';
import { MyOrdersTable } from '@/components/MyOrdersTable';

const HomeRetailer: FC = async () => {
  const me = await applyAuthorizationOperations();

  return (
    <main className="flex min-h-screen">
      <section
        className="flex flex-col w-full"
        style={{
          background: 'no-repeat center/100% url("/fruits/marketplace-dashboard-bg.png")',
        }}
      >
        <MainNavigationHeader me={me} />
        <NavigationGrower />
        <div className="px-4">
          <OrdersCards />
          <MyOrdersTable />
        </div>
      </section>
    </main>
  );
};

export default HomeRetailer;
