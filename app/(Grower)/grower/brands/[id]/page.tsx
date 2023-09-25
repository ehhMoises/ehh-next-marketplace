import { FC } from 'react';
import { NavigationGrower } from '@/app/(Grower)/components/Navigation';
import { BrandsForm } from '@/app/(Grower)/components/brands/Form';
import { IParamsProps } from '@/models/paramsPage';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { applyAuthorizationOperations } from '@/lib/auth-checking';

const BrandDetail: FC<IParamsProps> = async ({ params }: { params: { id: string } }) => {
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
        <BrandsForm params={params} />
      </section>
    </main>
  );
};

export default BrandDetail;
