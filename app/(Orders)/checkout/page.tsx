import MainNavigationHeader from '@/components/MainNavigationHeader';

import { Fragment } from 'react';
import Footer from '@/components/Footer';
import { CheckoutTable } from '../CheckoutTable';

export default async function CheckoutPage() {
  return (
    <Fragment key="SearchBrands">
      <main className="flex min-h-screen">
        <section className="flex flex-col w-full">
          <MainNavigationHeader />
          <CheckoutTable />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}
