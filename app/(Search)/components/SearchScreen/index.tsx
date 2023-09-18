'use client';

import { FC, Fragment, useEffect, useState } from 'react';
import SortBrand from '@/app/(Home)/SortBrand';
import ProductCard from '@/components/ProductCard';
import Cookies from 'js-cookie';
import { PRODUCT_CARD_MODE_KEY } from '@/lib/constant/cookies';
import { ProductCardMode } from '@/lib/constant/ui';
import { cn } from '@/lib/utils';
import LoaderSearch from '../LoaderSearch';
import BrandFilters from '../BrandFilters';
import { OrderModal } from '../OrderModal';
import { ProductPresentation } from '@/models/product';

interface SearchScreenProps {
  brands: string[];
  varieties: string[];
  packStyles: string[];
  packSizeList: string[];
  grades: string[];
  addresses: string[];
  products: ProductPresentation[];
}

const SearchScreen: FC<SearchScreenProps> = ({
  brands,
  varieties,
  packStyles,
  packSizeList,
  grades,
  addresses,
  products,
}) => {
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

  const searchBrandsHandler = async ({ commodity }: { brandId: string; commodity: string; variety: string }) => {
    if (currentCardsMode === ProductCardMode.ON_FILTER) {
      setLoadingSearch(true);
      const formData = new FormData();
      formData.set('commodity', commodity);

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
        <BrandFilters
          brands={brands}
          varieties={varieties}
          packSizeList={packSizeList}
          packStyles={packStyles}
          grades={grades}
          addresses={addresses}
        />

        <div
          className={cn(
            'grid grid-col-1 sm:grid-cols-2 gap-5 col-span-3 mt-3 xl:mt-0 min-h-[25rem]',
            loadingSearch ? 'lg:grid-cols-1' : 'lg:grid-cols-3'
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
                image={product.imageUrl.includes('empty') ? '/only-logo-neutral.png' : product.imageUrl}
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
