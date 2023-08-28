import MainNavigationHeader from '@/components/MainNavigationHeader';
import { Fragment } from 'react';
import Footer from '@/components/Footer';
import { PotentialsGrowersTable } from '../PotentialsGrowersTable';
import { Metadata } from 'next';
import PotentialGrowersSchema from '@/app/(Search)/lib/potentialGrowersSchema';
import { getPossibleGrowers, getPossibleGrowersViaQuickSearch } from '@/lib/api/product';
import { cookies } from 'next/headers';
import { TokenTypes } from '@/lib/cookies';

interface SearchParamsPotentialGrowers {
  commodity: string;
  growingMethod: string;
  variety: string;
  quantity: string;
  deliveryDateUtc: string;
}

interface QuickSearchParamsPotentialGrowers {
  commodity: string;
  packStyleId: string;
  packSizeId: string;
  quantity: string;
  deliveryDateUtc: string;
  grade: string;
}

export const metadata: Metadata = {
  title: 'Searching Growers - Marketplace',
  description: 'Potential Growers',
};

const getPotentialGrowers = async (
  searchParams: SearchParamsPotentialGrowers | QuickSearchParamsPotentialGrowers,
  isQuickSearch: boolean
) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(TokenTypes.ACCESS_TOKEN)?.value;
  const deliveryDateUtc = new Date(Number.parseInt(searchParams.deliveryDateUtc, 10)).toISOString();

  if (isQuickSearch) {
    const quickSearchPayload = searchParams as QuickSearchParamsPotentialGrowers;
    const response = await getPossibleGrowersViaQuickSearch({
      commodity: quickSearchPayload.commodity,
      deliveryDateUtc,
      gradeId: quickSearchPayload.grade,
      packSizeId: quickSearchPayload.packSizeId,
      packStyleId: quickSearchPayload.packStyleId,
      quantity: Number.parseInt(quickSearchPayload.quantity, 10),
      accessToken,
    });

    return response?.data ?? [];
  } else {
    const potentialGrowersPayload = await PotentialGrowersSchema.validate({
      ...searchParams,
      deliveryDateUtc,
    });

    const response = await getPossibleGrowers({
      ...potentialGrowersPayload,
      accessToken,
    });

    return response?.data ?? [];
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function OrdersPage({
  searchParams,
}: {
  searchParams: (SearchParamsPotentialGrowers | QuickSearchParamsPotentialGrowers) & { mode: string };
}) {
  const { mode, ...restSearchParams } = searchParams;
  const potentialGrowers = await getPotentialGrowers(restSearchParams, mode === 'quick-search');

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
