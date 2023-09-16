import { saveOrder } from '@/lib/api/purchase-order';
import { useMutation } from '@tanstack/react-query';

export const useSaveOrderMutation = () =>
  useMutation({
    mutationFn: saveOrder,
  });
