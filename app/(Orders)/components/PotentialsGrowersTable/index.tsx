'use client';

import { FC, useState } from 'react';
import { getColumns } from './columns';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/ui/data-table';
import { Progress } from '@/components/ui/progress';
import { PotentialGrowers } from '@/models/targetSellers';
import { useCreateShoppingCartMutation } from '../../lib/hooks/mutations/useCreateShoppingCartMutation';
import { useTimeIntermediate } from '@/lib/hooks/useTimeIntermidiate';
import { useRemoveItemCartMutation } from '../../lib/hooks/mutations/useRemoveItemCartMutation';
import { objectToURL } from '@/lib/urlParser';
import {
  QuickSearchParamsPotentialGrowers,
  SearchParamsPotentialGrowers,
} from '../../lib/interface/searchParamsPotentialGrowers';
import { setCookie } from '@/lib/cookie';
import { QUERY_SEARCH_POTENTIAL_GROWERS } from '@/lib/constant/cookies';
import { useToast } from '@/components/ui/use-toast';

interface PotentialsGrowersProps {
  potentialGrowers: PotentialGrowers[];
  rawDeliveryDateUtc: string;
  rawQuantity: string;
  searchParams: (SearchParamsPotentialGrowers | QuickSearchParamsPotentialGrowers) & {
    mode: string;
  };
}

export const PotentialsGrowersTable: FC<PotentialsGrowersProps> = ({
  potentialGrowers,
  rawDeliveryDateUtc,
  rawQuantity,
  searchParams,
}) => {
  const [currentPotentialGrowers, setCurrentPotentialGrowers] = useState<PotentialGrowers[]>(potentialGrowers);
  const { mutateAsync: addCartItem, isLoading } = useCreateShoppingCartMutation();
  const { mutateAsync: removeItemFromCart, isLoading: isRemovingItemCart } = useRemoveItemCartMutation();
  const router = useRouter();
  const intermediateTime = useTimeIntermediate(isLoading);
  const isLoadingProgress = isLoading || isRemovingItemCart;
  const { toast } = useToast();

  const addStockToCartHandler = async (stockId: string, shipToLocation: string) => {
    const deliveryDateUtc = new Date(Number.parseInt(rawDeliveryDateUtc, 10)).toISOString();
    const quantity = Number.parseInt(rawQuantity, 10);

    await addCartItem({
      stockId,
      deliveryDateUtc,
      shipToLocation,
      quantity,
    });

    setCurrentPotentialGrowers((prevPotentialGrowers) =>
      prevPotentialGrowers.filter((prevPotentialGrower) => prevPotentialGrower.id !== stockId)
    );
    toast({
      title: 'Item Successfully Added to Cart',
      className: 'bg-slate-500 text-white',
    });
  };

  const removeCartItemHandler = async (stockId: string, cartItem: string) => {
    await removeItemFromCart({
      cartItem,
    });

    setCurrentPotentialGrowers((prevPotentialGrowers) =>
      prevPotentialGrowers.map((potentialGrower) => {
        if (potentialGrower.id === stockId) {
          return {
            ...potentialGrower,
            isUnderCart: false,
            cartItemId: null,
          };
        }

        return potentialGrower;
      })
    );

    toast({
      title: 'Item Successfully Removed from Cart',
      className: 'bg-slate-500 text-white',
    });
  };

  const goToVerifyOrderHandler = () => {
    const originQueryList = objectToURL('', searchParams as unknown as Record<string, string>);
    setCookie(QUERY_SEARCH_POTENTIAL_GROWERS, originQueryList);

    router.replace('/checkout');
  };

  return (
    <div className="mt-4 px-5 md:px-8">
      <div className="flex justify-end">
        <div className="flex flex-col md:flex-row gap-x-2 mb-4">
          <Button
            className="px-10 bg-transparent text-black rounded-sm"
            variant="ghost"
            onClick={() => {
              router.push('/search');
            }}
          >
            Keep Shopping
          </Button>
          <Button className="px-10 rounded-sm" onClick={goToVerifyOrderHandler}>
            Verify Order
          </Button>
        </div>
      </div>

      {isLoadingProgress && (
        <div className="my-1">
          <Progress value={intermediateTime} className="h-3" />
        </div>
      )}

      <DataTable
        columns={getColumns({
          addStockToCartHandler,
          removeCartItemHandler,
        })}
        data={currentPotentialGrowers}
      />
    </div>
  );
};
