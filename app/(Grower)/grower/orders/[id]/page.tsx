import { FC } from 'react';
import { NavigationGrower } from '@/app/(Grower)/components/Navigation';
import { IParamsProps } from '@/app/interfaces';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { applyAuthorizationOperations } from '@/lib/auth-checking';

const OrderDetail: FC<IParamsProps> = async ({ params }: { params: { id: string } }) => {
  const me = await applyAuthorizationOperations();

  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col w-full">
        <MainNavigationHeader me={me} />
        <NavigationGrower />
        <div className="p-4 pt-0">Order detail</div>
      </section>
    </main>
  );
};

export default OrderDetail;
