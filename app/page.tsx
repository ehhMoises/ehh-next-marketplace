import MainNavigationHeader from '@/components/MainNavigationHeader';
import HomeScreen from './(Home)/HomeScreen';
import Footer from '@/components/Footer';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment key="home">
      <main className="flex min-h-screen">
        <section className="flex flex-col w-full">
          <MainNavigationHeader />
          <HomeScreen />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}
