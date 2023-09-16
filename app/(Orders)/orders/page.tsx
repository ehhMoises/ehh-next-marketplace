import { Fragment, Suspense } from 'react';
import { Metadata } from 'next';
import PotentialGrowersSchema from '@/app/(Search)/lib/potentialGrowersSchema';
import { getPossibleGrowers } from '@/lib/api/product';
import { cookies } from 'next/headers';
import { TokenTypes } from '@/lib/constant/cookies';
import { notFound } from 'next/navigation';
import { PotentialsGrowersTable } from '../components/PotentialsGrowersTable';
import { getPossibleGrowersViaQuickSearch } from '@/lib/api/quick-search';
import {
  QuickSearchParamsPotentialGrowers,
  SearchParamsPotentialGrowers,
} from '../lib/interface/searchParamsPotentialGrowers';
import { getPotentialGrowersByskippingHoldingCartItems } from '../lib/granularPotentialGrowers';

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

    const potentialGrowers = await getPotentialGrowersByskippingHoldingCartItems({
      accessToken,
      potentialGrowers: response?.data ?? [],
    });

    return potentialGrowers;
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

  console.log('searchParams', searchParams);
  return (
    <Fragment key="PotentialGrowersPage">
      <Suspense fallback={<div>Loading...</div>}>
        <PotentialsGrowersTable
          searchParams={searchParams}
          potentialGrowers={potentialGrowers}
          rawDeliveryDateUtc={restSearchParams.deliveryDateUtc}
          rawQuantity={restSearchParams.quantity}
        />
      </Suspense>
    </Fragment>
  );
}
