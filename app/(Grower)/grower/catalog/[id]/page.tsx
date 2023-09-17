import { FC } from 'react';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { NavigationGrower } from '../../../components/Navigation';
import { IParamsProps } from '@/app/interfaces';
import { CatalogForm } from '@/app/(Grower)/components/catalog/Form';
import { applyAuthorizationOperations } from '@/lib/auth-checking';

const GrowerCatalogDetail: FC<IParamsProps> = async ({ params }: { params: { id: string } }) => {
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
          <CatalogForm params={params} />
        </div>
      </section>
    </main>
  );
};

export default GrowerCatalogDetail;
