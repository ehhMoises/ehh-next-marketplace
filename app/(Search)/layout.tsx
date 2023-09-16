import Footer from '@/components/Footer';
import { HeroComponent } from '@/components/Hero';
import MainNavigationHeader from '@/components/MainNavigationHeader';
import { applyAuthorizationOperations } from '@/lib/auth-checking';
import { Fragment } from 'react';

const SearchLayout = async ({ children }: { children: React.ReactNode }) => {
  const me = await applyAuthorizationOperations();

  return (
    <Fragment key="SearchBrands">
      <main className="flex min-h-screen">
        <section className="flex flex-col w-full">
          <MainNavigationHeader me={me} />
          <HeroComponent />
          {children}
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default SearchLayout;
