'use client';

import { Fragment, useEffect } from 'react';
import SortBrand from '../SortBrand';
import ProductCard from '@/components/ProductCard';
import { PRODUCT_CARD_MODE_KEY } from '@/lib/cookies';
import Cookies from 'js-cookie';
import { ProductCardMode } from '@/lib/constant/ui';

const HomeScreen = () => {
  useEffect(() => {
    Cookies.set(PRODUCT_CARD_MODE_KEY, ProductCardMode.PRESENTATIONAL, { sameSite: 'Lax' });
  }, []);

  return (
    <Fragment key="HomeScreen">
      <SortBrand
        onSelectSorting={(data) => {
          console.log('data', data);
        }}
      />

      <section className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 mx-10">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((d, index) => (
          <ProductCard key={`${d}.${index}`} mode={ProductCardMode.PRESENTATIONAL} />
        ))}
      </section>
    </Fragment>
  );
};

export default HomeScreen;
