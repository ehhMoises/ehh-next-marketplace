import { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductPresentation, QuickSearchOptions } from '@/models/product';
import { cookies } from 'next/headers';
import { TokenTypes } from '@/lib/constant/cookies';
import SearchScreen from '../components/SearchScreen';
import { getQuickSearchOptions } from '@/lib/api/quick-search';
import { getCommoditiesProduct } from '@/lib/api/product';
import LoaderSearch from '../components/LoaderSearch';

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
    addresses: options?.addresses ?? [],
    // addresses: [
    //   '841 Thompson Plain, Rowland Height 65013 Donnelly Mount 93724 Rowland Heights North Dakota',
    //   '389 Bradtke Shore Burgloch 71 91035 Morissettestad New Hampshire',
    // ],
  };
};

export default async function SearchPage() {
  const { commodities, grades, packSizes, packStyles, varieties, products, addresses } = await getData();

  return (
    <section className="flex flex-col w-full">
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full mt-10 lg:mt-40">
            <div>
              <LoaderSearch />
            </div>
          </div>
        }
      >
        <SearchScreen
          brands={commodities}
          varieties={varieties}
          products={products}
          grades={grades}
          packStyles={packStyles}
          packSizeList={packSizes}
          addresses={addresses}
        />
      </Suspense>
    </section>
  );
}
