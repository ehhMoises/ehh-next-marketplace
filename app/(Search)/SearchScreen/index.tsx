'use client';

import { Fragment } from 'react';
import ProductCard, { ProductCardMode } from '@/components/ProductCard';
import SortBrand from '@/app/(Home)/SortBrand';
import BrandFilters from '../BrandFilters';

const SearchScreen = () => {
  return (
    <Fragment key="SearchScreen">
      <SortBrand
        onSelectSorting={(data) => {
          console.log('data', data);
        }}
      />

      <section className="grid grid-cols-1 xl:grid-cols-4 mt-10 mx-3 sm:mx-10 gap-x-0 xl:gap-x-6">
        <div>
          <BrandFilters />
        </div>

        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 col-span-3 mt-3 xl:mt-0">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((d, index) => (
            <div key={`${d}.${index}`}>
              <ProductCard onSelectItem={() => {}} showPriceLabel mode={ProductCardMode.FILTERED} />
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default SearchScreen;
