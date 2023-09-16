import Footer from '@/components/Footer';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { applyAuthorizationOperations } from '@/lib/auth-checking';
import { Fragment, ReactNode } from 'react';

export default async function OrdersLayoutPage({ children }: { children: ReactNode }) {
  const me = await applyAuthorizationOperations();

  return (
    <Fragment key="LayoutPotentialGrowersPage">
      <main className="flex min-h-screen">
        <section className="flex flex-col w-full">
          <MainNavigationHeader me={me} />
          {children}
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}
