import { FC } from 'react';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { NavigationGrower } from '../../components/Navigation';
import { StockTable } from '../../components/catalog/Table';
import { applyAuthorizationOperations } from '@/lib/auth-checking';

const GrowerCatalog: FC = async () => {
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
        <NavigationGrower />
        <StockTable />
      </section>
    </main>
  );
};

export default GrowerCatalog;
