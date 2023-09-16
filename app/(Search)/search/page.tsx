import { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductPresentation, QuickSearchOptions } from '@/models/product';
import { cookies } from 'next/headers';
import { TokenTypes } from '@/lib/constant/cookies';
import SearchScreen from '../components/SearchScreen';
import { getQuickSearchOptions } from '@/lib/api/quick-search';
import { getCommoditiesProduct } from '@/lib/api/product';

export const metadata: Metadata = {
  title: 'Filter Brands Retailer - Marketplace',
  description: 'Filter Brands',
};

const getData = async (): Promise<QuickSearchOptions & { products: ProductPresentation[] }> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(TokenTypes.ACCESS_TOKEN)?.value;

  const products = (await getCommoditiesProduct(accessToken))?.data ?? [];
  const options = await getQuickSearchOptions({ accessToken });
  return {
    commodities: options?.commodities ?? [],
    varieties: options?.varieties ?? [],
    packSizes: options?.packSizes ?? [],
    packStyles: options?.packStyles ?? [],
    grades: options?.grades ?? [],
    products,
  };
};

export default async function SearchPage() {
  const { commodities, grades, packSizes, packStyles, varieties, products } = await getData();

  return (
    <section className="flex flex-col w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchScreen
          brands={commodities}
          varieties={varieties}
          products={products}
          grades={grades}
          packStyles={packStyles}
          packSizeList={packSizes}
        />
      </Suspense>
    </section>
  );
}
