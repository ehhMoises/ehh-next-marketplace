import MainNavigationHeader from '@/components/MainNavigationHeader';
import HomeScreen from './(Home)/HomeScreen';
import Footer from '@/components/Footer';
import { Fragment, Suspense } from 'react';
import { HeroComponent } from '@/components/Hero';
import { getPlaceholdersBrand } from '@/lib/api/product';
import { ProductPresentation } from '@/models/product';

const getData = async (): Promise<ProductPresentation[]> => {
  const data = await getPlaceholdersBrand();
  return data?.data ?? [];
};

export default async function Home() {
  const placeHolderProducts = await getData();

  return (
    <Fragment key="home">
      <main className="flex min-h-screen">
        <section className="flex flex-col w-full">
          <MainNavigationHeader />
          <HeroComponent />

          <Suspense fallback={<div>Loading...</div>}>
            <HomeScreen products={placeHolderProducts} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}
