import MainNavigationHeader from '@/components/MainNavigationHeader';

import { Fragment } from 'react';
import Footer from '@/components/Footer';
import { CheckoutTable } from '../CheckoutTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify Orders Retailer - Marketplace',
  description: 'Verify Orders Retailer',
};

export default async function CheckoutPage() {
  return (
    <Fragment key="CheckoutRetailerPage">
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
