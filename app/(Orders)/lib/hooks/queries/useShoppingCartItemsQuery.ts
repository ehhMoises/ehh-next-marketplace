import { SHOPPING_CART_QUERY_KEYS } from '@/constants/shopping-cart';
import { getCartsByUser } from '@/lib/api/shopping-cart';
import { useQuery } from '@tanstack/react-query';

const { GET_CART_ITEMS } = SHOPPING_CART_QUERY_KEYS;

export const useShoppingCartItemsQuery = () =>
  useQuery([GET_CART_ITEMS], () => getCartsByUser({}), {
    retry: false,
  });
