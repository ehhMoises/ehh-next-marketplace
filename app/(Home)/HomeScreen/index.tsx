'use client';

import { Fragment } from 'react';
import SortBrand from '../SortBrand';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

const HomeScreen = () => {
  return (
    <Fragment key="HomeScreen">
      <SortBrand
        onSelectSorting={(data) => {
          console.log('data', data);
        }}
      />

      <section className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 mx-10">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((d, index) => (
          <Link key={`${d}.${index}`} href={'/search'}>
            <ProductCard onSelectItem={() => {}} />
          </Link>
        ))}
      </section>
    </Fragment>
  );
};

export default HomeScreen;
