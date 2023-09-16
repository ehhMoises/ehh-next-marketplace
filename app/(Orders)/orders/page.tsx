import { Fragment, Suspense } from 'react';
import { Metadata } from 'next';
import PotentialGrowersSchema from '@/app/(Search)/lib/potentialGrowersSchema';
import { getPossibleGrowers } from '@/lib/api/product';
import { cookies } from 'next/headers';
import { TokenTypes } from '@/lib/constant/cookies';
import { notFound } from 'next/navigation';
import { PotentialsGrowersTable } from '../PotentialsGrowersTable';
import { getPossibleGrowersViaQuickSearch } from '@/lib/api/quick-search';

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
      grade: quickSearchPayload.grade,
      packSize: quickSearchPayload.packSizeId,
      packStyle: quickSearchPayload.packStyleId,
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

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: (SearchParamsPotentialGrowers | QuickSearchParamsPotentialGrowers) & { mode: string };
}) {
  const { mode, ...restSearchParams } = searchParams;
  const potentialGrowers = await getPotentialGrowers(restSearchParams, mode === 'quick-search');

  if (potentialGrowers.length === 0) {
    notFound();
  }

  return (
    <Fragment key="PotentialGrowersPage">
      <Suspense fallback={<div>Loading...</div>}>
        <PotentialsGrowersTable potentialGrowers={potentialGrowers} />
      </Suspense>
    </Fragment>
  );
}
