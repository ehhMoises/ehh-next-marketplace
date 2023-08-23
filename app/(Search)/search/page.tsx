import MainNavigationHeader from '@/components/MainNavigationHeader';
import SearchScreen from '../SearchScreen';
import { Fragment, Suspense } from 'react';
import Footer from '@/components/Footer';
import { HeroComponent } from '@/components/Hero';
import { Metadata } from 'next';
import { getPackSizeList } from '@/lib/api/packSize';
import { PackSize } from '@/models/packSize';
// import { cookies } from 'next/headers';
import { getPackStyles } from '@/lib/api/packStyle';
import { PackStyle } from '@/models/packStyle';
import { getGrades } from '@/lib/api/grade';
import { Grade } from '@/models/grade';
// import { PRODUCT_CARD_MODE_KEY } from '@/lib/cookies';

export const metadata: Metadata = {
  title: 'Filter Brands Retailer - Marketplace',
  description: 'Filter Brands',
};

const getData = async (): Promise<[PackSize[], PackStyle[], Grade[]]> => {
  // const cookieStore = cookies();
  // console.log(cookieStore.get(PRODUCT_CARD_MODE_KEY));
  return Promise.all([(await getPackSizeList()) ?? [], (await getPackStyles()) ?? [], (await getGrades()) ?? []]);
};

export default async function SearchPage() {
  const [packSizeList, packStyles, grades] = await getData();

  return (
    <Fragment key="SearchBrands">
      <main className="flex min-h-screen">
        <section className="flex flex-col w-full">
          <MainNavigationHeader />
          <HeroComponent />
          <Suspense fallback={<div>Loading...</div>}>
            <SearchScreen grades={grades} packStyles={packStyles} packSizeList={packSizeList} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}
