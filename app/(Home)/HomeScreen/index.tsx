'use client';

import { FC, Fragment, useEffect } from 'react';
import SortBrand from '../SortBrand';
import ProductCard from '@/components/ProductCard';
import { PRODUCT_CARD_MODE_KEY } from '@/lib/constant/cookies';
import Cookies from 'js-cookie';
import { ProductCardMode } from '@/lib/constant/ui';
import { ProductPresentation } from '@/models/product';

const HomeScreen: FC<{ products: ProductPresentation[] }> = ({ products }) => {
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
        {products.map((product) => (
          <ProductCard
            brandId={product.id}
            commodity={product.commodity}
            variety={product.variety}
            key={product.id}
            mode={ProductCardMode.PRESENTATIONAL}
          />
        ))}
      </section>
    </Fragment>
  );
};

export default HomeScreen;
