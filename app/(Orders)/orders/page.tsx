import MainNavigationHeader from '@/components/MainNavigationHeader';

import { Fragment } from 'react';
import Footer from '@/components/Footer';
import { OrdersTable } from '../OrdersTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orders Retailer - Marketplace',
  description: 'Filter Brands',
};

export default async function OrdersPage() {
  return (
    <Fragment key="PotentialRetailerTransactionsPage">
      <main className="flex min-h-screen">
        <section className="flex flex-col w-full">
          <MainNavigationHeader />
          <OrdersTable />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}
