import { FC } from 'react';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { NavigationMenuRetailer } from '../../components/Navigation';
import { applyAuthorizationOperations } from '@/lib/auth-checking';
import { MyOrdersTable } from '@/components/OrdersTable';

const OrdersRetailer: FC = async () => {
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
        <NavigationMenuRetailer />
        <div className="p-4 pt-0">
          <MyOrdersTable />
        </div>
      </section>
    </main>
  );
};

export default OrdersRetailer;
