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
import { useSaveOrderMutation } from '../../lib/hooks/mutations/useSaveOrderMutation';

export const CheckoutTable: FC = () => {
  const router = useRouter();
  const { mutateAsync: removeItemFromCart, isLoading: isRemovingItemCart } = useRemoveItemCartMutation();
  const { mutateAsync: saveOrder, isLoading: isSavingOrder } = useSaveOrderMutation();
  const { data, isLoading: isLoadingItems, isFetching: isFetchingItems } = useShoppingCartItemsQuery();
  const items = data?.data ?? [];
  const isLoading = isLoadingItems || isFetchingItems || isRemovingItemCart || isSavingOrder;
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

  const saveOrderHandler = async () => {
    await saveOrder({});
    toast({
      title: 'Order Successfully Saved!',
      className: 'bg-slate-500 text-white',
    });
    router.replace('/retailer/orders');
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
          {!!data?.data.length && (
            <Button className="px-10 rounded-sm" onClick={saveOrderHandler}>
              Save Order
            </Button>
          )}
        </div>
      </div>
      {isLoading && (
        <div className="my-1">
          <Progress value={intermediateTime} className="h-3" />
        </div>
      )}
      {data?.data &&
        (data.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="mt-10 md:mt-20">
              <p className="text-5xl text-center text-stone-500">Shopping Cart Empty</p>
            </div>
          </div>
        ) : (
          <DataTable
            columns={getColumns({
              onRemoveItemFromCart: removeItemFromCartHandler,
            })}
            data={items}
          />
        ))}
    </div>
  );
};
