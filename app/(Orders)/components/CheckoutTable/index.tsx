'use client';

import { FC } from 'react';
import { getColumns } from './columns';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/ui/data-table';
import { useShoppingCartItemsQuery } from '../../lib/hooks/queries/useShoppingCartItemsQuery';
import { useTimeIntermediate } from '@/lib/hooks/useTimeIntermidiate';
import { Progress } from '@/components/ui/progress';
import { useRemoveItemCartMutation } from '../../lib/hooks/mutations/useRemoveItemCartMutation';
import useCookie from '@/lib/hooks/useCookie';
import { QUERY_SEARCH_POTENTIAL_GROWERS } from '@/lib/constant/cookies';
import { useToast } from '@/components/ui/use-toast';

export const CheckoutTable: FC = () => {
  const router = useRouter();
  const { mutateAsync: removeItemFromCart, isLoading: isRemovingItemCart } = useRemoveItemCartMutation();
  const { data, isLoading: isLoadingItems, isFetching: isFetchingItems } = useShoppingCartItemsQuery();
  const items = data?.data ?? [];
  const isLoading = isLoadingItems || isFetchingItems || isRemovingItemCart;
  const intermediateTime = useTimeIntermediate(isLoading);
  const querySearchPotentialGrowers = useCookie(QUERY_SEARCH_POTENTIAL_GROWERS);
  const { toast } = useToast();

  const removeItemFromCartHandler = async (itemId: string) => {
    await removeItemFromCart({
      cartItem: itemId,
    });

    toast({
      title: 'Item Successfully Removed from Cart',
      className: 'bg-slate-500 text-white',
    });
  };

  return (
    <div className="mt-4 px-5 md:px-8">
      <div className="flex justify-end">
        <div className="flex flex-col md:flex-row gap-x-2 mb-4">
          {querySearchPotentialGrowers && (
            <Button
              variant={'secondary'}
              className="px-10 rounded-sm font-semibold"
              onClick={() => {
                window.location.href = `${window.location.origin}/orders?${querySearchPotentialGrowers}`;
              }}
            >
              Go Back Recent Search
            </Button>
          )}
          <Button
            className="px-10 bg-transparent text-black rounded-sm"
            variant="ghost"
            onClick={() => {
              router.push('/search');
            }}
          >
            Keep Shopping
          </Button>
          <Button className="px-10 rounded-sm" onClick={() => router.push('/retailer/orders')}>
            Save Order
          </Button>
        </div>
      </div>
      {isLoading && (
        <div className="my-1">
          <Progress value={intermediateTime} className="h-3" />
        </div>
      )}
      {data?.data && (
        <DataTable
          columns={getColumns({
            onRemoveItemFromCart: removeItemFromCartHandler,
          })}
          data={items}
        />
      )}
    </div>
  );
};
