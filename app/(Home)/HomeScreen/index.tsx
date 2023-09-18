'use client';

import { FC, Fragment, useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { PRODUCT_CARD_MODE_KEY } from '@/lib/constant/cookies';
import { ProductCardMode } from '@/lib/constant/ui';
import { ProductPresentation } from '@/models/product';
import { SortingCommodityType } from '@/models/user-interface';
import SortBrand from '@/components/SortBrand';
import { sortingPlaceholderCommodity } from '@/lib/utils';
import { setCookie } from '@/lib/cookie';

const HomeScreen: FC<{ products: ProductPresentation[] }> = ({ products }) => {
  const [availableProducts, setAvailableProducts] = useState(products);

  useEffect(() => {
    setCookie(PRODUCT_CARD_MODE_KEY, ProductCardMode.PRESENTATIONAL);
  }, []);

  const sortCommodityHandler = (sortType: SortingCommodityType) => {
    setAvailableProducts(sortingPlaceholderCommodity(products, sortType));
  };

  return (
    <Fragment key="HomeScreen">
      <SortBrand onSelectSorting={sortCommodityHandler} />

      <section className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 mx-10">
        {availableProducts.map((product) => (
          <ProductCard
            brandId={product.id}
            commodity={product.commodity}
            image={product.imageUrl.includes('empty') ? '/only-logo-neutral.png' : product.imageUrl}
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
