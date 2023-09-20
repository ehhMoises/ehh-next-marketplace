import { queryClient } from '@/app/provider';
import { ORDERS_QUERY_KEYS } from '@/constants/orders';
import { addOrder, updateOrder } from '@/lib/api/purchase-order';
import { useMutation } from '@tanstack/react-query';

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ORDERS_QUERY_KEYS.CREATE_ORDER],
      });
    },
  });

export const useUpdateOrderMutation = () =>
  useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ORDERS_QUERY_KEYS.GET_ORDERS],
      });
      queryClient.invalidateQueries({
        queryKey: [ORDERS_QUERY_KEYS.GET_ORDER_DETAIL],
      });
    },
  });