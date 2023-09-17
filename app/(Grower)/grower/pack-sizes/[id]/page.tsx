import { FC } from 'react';
import { NavigationGrower } from '@/app/(Grower)/components/Navigation';
import { PackSizeForm } from '@/app/(Grower)/components/pack-sizes/Form';
import { IParamsProps } from '@/app/interfaces';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { applyAuthorizationOperations } from '@/lib/auth-checking';

const PackSizeDetail: FC<IParamsProps> = async ({ params }: { params: { id: string } }) => {
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
        <PackSizeForm params={params} />
      </section>
    </main>
  );
};

export default PackSizeDetail;
