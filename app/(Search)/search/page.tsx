import { Metadata } from 'next';
import { getPackStyles } from '@/lib/api/packStyle';
import { getGrades } from '@/lib/api/grade';
import { getCommoditiesProduct } from '@/lib/api/product';
import { Suspense } from 'react';
import { PackSize } from '@/models/packSize';
import { PackStyle } from '@/models/packStyle';
import { Grade } from '@/models/grade';
import { ProductPresentation } from '@/models/product';
import { cookies } from 'next/headers';
import { getPackSizeList } from '@/lib/api/packSize';
import { TokenTypes } from '@/lib/constant/cookies';
import SearchScreen from '../components/SearchScreen';
import { getBrands } from '@/lib/api/brand';
import { Brand } from '@/models/brand';
import { GrowingMethod } from '@/models/growingMethod';

export const metadata: Metadata = {
  title: 'Filter Brands Retailer - Marketplace',
  description: 'Filter Brands',
};

const getData = async (): Promise<
  [Brand<GrowingMethod>[], PackSize[], PackStyle[], Grade[], ProductPresentation[]]
> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(TokenTypes.ACCESS_TOKEN)?.value;
  return Promise.all([
    (await getBrands({ accessToken }))?.data ?? [],
    (await getPackSizeList({ accessToken })) ?? [],
    (await getPackStyles({ accessToken })) ?? [],
    (await getGrades({ accessToken })) ?? [],
    (await getCommoditiesProduct(accessToken))?.data ?? [],
  ]);
};

export default async function SearchPage() {
  const [brands, packSizeList, packStyles, grades, products] = await getData();

  return (
    <section className="flex flex-col w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchScreen
          brands={brands}
          products={products}
          grades={grades}
          packStyles={packStyles}
          packSizeList={packSizeList}
        />
      </Suspense>
    </section>
  );
}
