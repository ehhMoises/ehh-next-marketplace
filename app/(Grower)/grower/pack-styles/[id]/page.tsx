import { FC } from 'react';
import { NavigationGrower } from '@/app/(Grower)/components/Navigation';
import { PackStyleForm } from '@/app/(Grower)/components/pack-styles/Form';
import { IParamsProps } from '@/app/interfaces';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { applyAuthorizationOperations } from '@/lib/auth-checking';

const PackStyleDetail: FC<IParamsProps> = async ({ params }: { params: { id: string } }) => {
  const me = await applyAuthorizationOperations();

  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col w-full">
        <MainNavigationHeader me={me} />
        <NavigationGrower />
        <PackStyleForm params={params} />
      </section>
    </main>
  );
};

export default PackStyleDetail;
