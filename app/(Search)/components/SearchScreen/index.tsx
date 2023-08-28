'use client';

import { FC, Fragment, useEffect, useState } from 'react';
import SortBrand from '@/app/(Home)/SortBrand';
import { PackSize } from '@/models/packSize';
import { PackStyle } from '@/models/packStyle';
import { Grade } from '@/models/grade';
import ProductCard from '@/components/ProductCard';
import Cookies from 'js-cookie';
import { PRODUCT_CARD_MODE_KEY } from '@/lib/cookies';
import { ProductCardMode } from '@/lib/constant/ui';
import { cn } from '@/lib/utils';
import { ProductPresentation } from '@/models/product';
import LoaderSearch from '../LoaderSearch';
import BrandFilters from '../BrandFilters';
import { OrderModal } from '../OrderModal';
import { Brand } from '@/models/brand';
import { GrowingMethod } from '@/models/growingMethod';

interface SearchScreenProps {
  brands: Brand<GrowingMethod>[];
  packStyles: PackStyle[];
  packSizeList: PackSize[];
  grades: Grade[];
  products: ProductPresentation[];
}

const SearchScreen: FC<SearchScreenProps> = ({ brands, packStyles, packSizeList, grades, products }) => {
  const [selectedProductDetailedCard, setSelectedProductDetailedCard] = useState<{
    commodity: string;
    variety: string;
    growingMethodId: number;
  }>({
    commodity: '',
    variety: '',
    growingMethodId: -1,
  });
  const [openModal, setOpenModal] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [currentCardsMode, setCurrentCardsMode] = useState<ProductCardMode>(ProductCardMode.ON_FILTER);
  const [availableProducts, setAvailableProducts] = useState(products);

  useEffect(() => {
    Cookies.set(PRODUCT_CARD_MODE_KEY, ProductCardMode.ON_FILTER, { sameSite: 'Lax' });
  }, []);

  const searchBrandsHandler = async ({ brandId }: { brandId: string; commodity: string; variety: string }) => {
    if (currentCardsMode === ProductCardMode.ON_FILTER) {
      setLoadingSearch(true);
      const formData = new FormData();
      formData.set('brandId', brandId);

      const jsonData: { [key: string]: FormDataEntryValue } = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });

      const response = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify(jsonData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const filteredProducts = await response.json();
      setCurrentCardsMode(ProductCardMode.FILTERED);
      setLoadingSearch(false);
      setAvailableProducts(filteredProducts);
    }
  };

  return (
    <Fragment key="SearchScreen">
      <OrderModal
        {...selectedProductDetailedCard}
        openModal={openModal}
        onOpenModal={(isOpen) => {
          setOpenModal(isOpen);
        }}
      />
      <SortBrand
        onSelectSorting={(data) => {
          console.log('data', data);
        }}
      />

      <section className="grid grid-cols-1 xl:grid-cols-4 mt-10 mx-3 sm:mx-10 gap-x-0 xl:gap-x-6">
        <BrandFilters brands={brands} packSizeList={packSizeList} packStyles={packStyles} grades={grades} />

        <div
          className={cn(
            'grid grid-col-1 sm:grid-cols-2 gap-5 col-span-3 mt-3 xl:mt-0',
            loadingSearch ? 'lg:grid-cols-1' : 'lg:grid-cols-3',
            currentCardsMode === ProductCardMode.FILTERED ? 'h-[28rem]' : 'h-[23rem]'
          )}
        >
          {loadingSearch ? (
            <div className="flex justify-center w-full mt-10">
              <div>
                <LoaderSearch />
              </div>
            </div>
          ) : (
            availableProducts.map((product) => (
              <ProductCard
                brandId={product.id}
                commodity={product.commodity}
                variety={product.variety}
                growingMethod={product.growingMethod}
                key={product.id}
                onSelectItem={searchBrandsHandler}
                mode={currentCardsMode}
                onSeePricingModal={(data) => {
                  setSelectedProductDetailedCard(data);
                  setOpenModal(true);
                }}
              />
            ))
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default SearchScreen;
