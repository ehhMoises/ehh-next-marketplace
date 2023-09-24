import MainNavigationHeader from '@/components/MainNavigationHeader';
import { FC } from 'react';
import { applyAuthorizationOperations } from '@/lib/auth-checking';
import { NavigationGrower } from '@/app/(Grower)/components/Navigation';
import { UsersTable } from '../../components/UsersTable';
import { AccountType } from '@/models/account-user';
import { NavigationMenuRetailer } from '@/app/(Retailer)/components/Navigation';

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

        {me?.account.type.name === AccountType.Grower ? <NavigationGrower /> : <NavigationMenuRetailer />}
        <div className="px-4">
          <UsersTable />
        </div>
      </section>
    </main>
  );
};

export default HomeRetailer;
