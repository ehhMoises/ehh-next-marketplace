import { FC } from 'react';
import { NavigationGrower } from '@/app/(Grower)/components/Navigation';
import { IParamsProps } from '@/app/interfaces';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { applyAuthorizationOperations } from '@/lib/auth-checking';
import { MyOrdersTable } from '@/components/OrdersTable';

const OrderPage: FC<IParamsProps> = async ({ params }: { params: { id: string } }) => {
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
        <div className="p-4 pt-0">
          <MyOrdersTable />
        </div>
      </section>
    </main>
  );
};

export default OrderPage;
