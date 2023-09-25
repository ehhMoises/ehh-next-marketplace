import { FC } from 'react';
import { NavigationGrower } from '@/app/(Grower)/components/Navigation';
import { IParamsProps } from '@/models/paramsPage';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { applyAuthorizationOperations } from '@/lib/auth-checking';
import { UsersForm } from '@/app/(Users)/components/Form';
import { NavigationMenuRetailer } from '@/app/(Retailer)/components/Navigation';
import { AccountType } from '@/models/account-user';

const OrderDetail: FC<IParamsProps> = async ({ params }: { params: { id: string } }) => {
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
        {me?.account.type.name === AccountType.Grower ? <NavigationGrower /> : <NavigationMenuRetailer />}
        <UsersForm params={params} />
      </section>
    </main>
  );
};

export default OrderDetail;
