import { queryClient } from '@/app/provider';
import { SHOPPING_CART_QUERY_KEYS } from '@/constants/shopping-cart';
import { removeCartItem } from '@/lib/api/shopping-cart';
import { useMutation } from '@tanstack/react-query';

const { GET_CART_ITEMS } = SHOPPING_CART_QUERY_KEYS;

export const useRemoveItemCartMutation = () =>
  useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries([GET_CART_ITEMS]);
    },
  });
