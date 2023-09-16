import MainNavigationHeader from '@/components/MainNavigationHeader';

import { Fragment } from 'react';
import Footer from '@/components/Footer';
import { CheckoutTable } from '../components/CheckoutTable';
import { Metadata } from 'next';
import { applyAuthorizationOperations } from '@/lib/auth-checking';

export const metadata: Metadata = {
  title: 'Verify Orders Retailer - Marketplace',
  description: 'Verify Orders Retailer',
};

export default async function CheckoutPage() {
  const me = await applyAuthorizationOperations();

  return (
    <Fragment key="CheckoutRetailerPage">
      <main className="flex min-h-screen">
        <section className="flex flex-col w-full">
          <MainNavigationHeader me={me} />
          <CheckoutTable />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}
