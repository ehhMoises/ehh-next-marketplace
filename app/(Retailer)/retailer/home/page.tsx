import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
import { NavigationMenuRetailer } from '../../components/Navigation';
import { OrdersCards } from '../../components/OrdersCards';
import { applyAuthorizationOperations } from '@/lib/auth-checking';
import { MyOrdersTable } from '@/components/OrdersTable';

const HomeRetailer: FC = async () => {
  const me = await applyAuthorizationOperations();

  return (
    <main className="flex min-h-screen">
      <section
        className="flex flex-col w-full"
        style={{
          background: 'repeat center/100% url("/fruits/marketplace-dashboard-bg.png")',
        }}
      >
        <MainNavigationHeader me={me} />
        <NavigationMenuRetailer />
        <div className="px-4">
          <OrdersCards />
          <MyOrdersTable />
        </div>
      </section>
    </main>
  );
};

export default HomeRetailer;
