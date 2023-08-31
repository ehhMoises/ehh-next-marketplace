import { queryClient } from '@/app/provider';
import { PACK_SIZE_QUERY_KEYS } from '@/constants/pack-size';
import { addPackSize, updatePackSize } from '@/lib/api/packSize';
import { useMutation } from '@tanstack/react-query';

export const useCreatePackSizeMutation = () =>
  useMutation({
    mutationFn: addPackSize,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PACK_SIZE_QUERY_KEYS.GET_PACK_SIZES],
      });
    },
  });

export const useUpdatePackSizeMutation = () =>
  useMutation({
    mutationFn: updatePackSize,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PACK_SIZE_QUERY_KEYS.GET_PACK_SIZES],
      });
      queryClient.invalidateQueries({
        queryKey: [PACK_SIZE_QUERY_KEYS.GET_PACK_SIZE_BY_ID],
      });
    },
  });
