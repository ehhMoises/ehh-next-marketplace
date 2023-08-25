import Footer from '@/components/Footer';
import { HeroComponent } from '@/components/Hero';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { Fragment } from 'react';

const SearchLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment key="SearchBrands">
      <main className="flex min-h-screen">
        <section className="flex flex-col w-full">
          <MainNavigationHeader />
          <HeroComponent />
          {children}
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default SearchLayout;
