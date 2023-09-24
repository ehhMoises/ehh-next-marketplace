import { FC } from 'react';
import { IParamsProps } from '@/app/interfaces';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { applyAuthorizationOperations } from '@/lib/auth-checking';
import { OrdersForm } from '@/components/OrdersForm';
import { NavigationMenuRetailer } from '@/app/(Retailer)/components/Navigation';

const OrderDetail: FC<IParamsProps> = async ({ params }: { params: { id: string } }) => {
  const me = await applyAuthorizationOperations();
  const accountType = me?.account.type.name;

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
          <OrdersForm params={params} accountType={accountType} />
        </div>
      </section>
    </main>
  );
};

export default OrderDetail;
