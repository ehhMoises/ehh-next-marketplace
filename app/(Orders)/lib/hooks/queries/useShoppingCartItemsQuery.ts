import { SHOPPING_CART_QUERY_KEYS } from '@/constants/shopping-cart';
import { getCartsByUser } from '@/lib/api/shopping-cart';
import { AccountType, IUserMe } from '@/models/account-user';
import { useQuery } from '@tanstack/react-query';

const { GET_CART_ITEMS } = SHOPPING_CART_QUERY_KEYS;

export const useShoppingCartItemsQuery = (me?: IUserMe) =>
  useQuery([GET_CART_ITEMS], () => getCartsByUser({}), {
    retry: false,
    enabled: !!me && me.account.type.name === AccountType.Buyer,
  });
