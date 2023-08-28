import MainNavigationHeader from '@/components/MainNavigationHeader';
import { Fragment } from 'react';
import Footer from '@/components/Footer';
import { PotentialsGrowersTable } from '../PotentialsGrowersTable';
import { Metadata } from 'next';
import PotentialGrowersSchema from '@/app/(Search)/lib/potentialGrowersSchema';
import { getPossibleGrowers } from '@/lib/api/product';
import { cookies } from 'next/headers';
import { TokenTypes } from '@/lib/cookies';

interface SearchParamsPotentialGrowers {
  commodity: string;
  growingMethod: string;
  variety: string;
  quantity: string;
  deliveryDateUtc: string;
}

export const metadata: Metadata = {
  title: 'Searching Growers - Marketplace',
  description: 'Potential Growers',
};

const getPotentialGrowers = async (searchParams: SearchParamsPotentialGrowers) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(TokenTypes.ACCESS_TOKEN)?.value;
  const deliveryDateUtc = new Date(Number.parseInt(searchParams.deliveryDateUtc, 10)).toISOString();
  const potentialGrowersPayload = await PotentialGrowersSchema.validate({
    ...searchParams,
    deliveryDateUtc,
  });

  const response = await getPossibleGrowers({
    ...potentialGrowersPayload,
    accessToken,
  });

  return response?.data ?? [];
};

export default async function OrdersPage({ searchParams }: { searchParams: SearchParamsPotentialGrowers }) {
  const potentialGrowers = await getPotentialGrowers(searchParams);

  return (
    <Fragment key="PotentialGrowersPage">
      <main className="flex min-h-screen">
        <section className="flex flex-col w-full">
          <MainNavigationHeader />
          <PotentialsGrowersTable potentialGrowers={potentialGrowers} />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}
