import MainNavigationHeader from '@/components/MainNavigationHeader';

import { Fragment } from 'react';
import Footer from '@/components/Footer';
import { OrdersTable } from '../OrdersTable';

async function getData() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
  // The return value is not serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function OrdersPage() {
  const data = await getData();
  console.log('DATA', data);
  return (
    <Fragment key="SearchBrands">
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
