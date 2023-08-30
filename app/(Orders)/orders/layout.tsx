import Footer from '@/components/Footer';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { Fragment, ReactNode } from 'react';

export default async function OrdersLayoutPage({ children }: { children: ReactNode }) {
  return (
    <Fragment key="LayoutPotentialGrowersPage">
      <main className="flex min-h-screen">
        <section className="flex flex-col w-full">
          <MainNavigationHeader />
          {children}
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}
