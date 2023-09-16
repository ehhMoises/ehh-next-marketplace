import { addCartItem } from '@/lib/api/shopping-cart';
import { useMutation } from '@tanstack/react-query';

export const useCreateShoppingCartMutation = () =>
  useMutation({
    mutationFn: addCartItem,
  });
