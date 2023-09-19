import { ORDERS_QUERY_KEYS } from '@/constants/orders';
import { getOrders } from '@/lib/api/purchase-order';
import { useQuery } from '@tanstack/react-query';

const defaultOptions = {
  retry: false,
};

export const useGetOrdersQuery = (queryProps: any) =>
  useQuery([ORDERS_QUERY_KEYS.GET_ORDERS], () => getOrders(), {
    ...defaultOptions,
    ...queryProps,
  });
