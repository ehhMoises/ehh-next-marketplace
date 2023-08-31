import { queryClient } from '@/app/provider';
import { PACK_STYLE_QUERY_KEYS } from '@/constants/pack-style';
import { addPackStyle, updatePackStyle } from '@/lib/api/packStyle';
import { useMutation } from '@tanstack/react-query';

export const useCreatePackStyleMutation = () =>
  useMutation({
    mutationFn: addPackStyle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PACK_STYLE_QUERY_KEYS.GET_PACK_STYLES],
      });
    },
  });

export const useUpdatePackStyleMutation = () =>
  useMutation({
    mutationFn: updatePackStyle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PACK_STYLE_QUERY_KEYS.GET_PACK_STYLES],
      });
      queryClient.invalidateQueries({
        queryKey: [PACK_STYLE_QUERY_KEYS.GET_PACK_STYLE_BY_ID],
      });
    },
  });
