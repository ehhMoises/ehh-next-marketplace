import MainNavigationHeader from '@/components/MainNavigationHeader';
import SearchScreen from '../SearchScreen';
import { Fragment } from 'react';
import Footer from '@/components/Footer';
import { HeroComponent } from '@/components/Hero';

export default function SearchPage() {
  return (
    <Fragment key="SearchBrands">
      <main className="flex min-h-screen">
        <section className="flex flex-col w-full">
          <MainNavigationHeader />
          <HeroComponent />
          <SearchScreen />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}
