import { PACK_STYLE_QUERY_KEYS } from '@/constants/pack-style';
import { getPackStyles } from '@/lib/api/packStyle';
import { useQuery } from '@tanstack/react-query';

const defaultOptions = {
  retry: false,
};

// Get all Brands
export const useGetPackStyleQuery = (queryProps: any) =>
  useQuery([PACK_STYLE_QUERY_KEYS.GET_PACK_SIZES], () => getPackStyles({}), {
    ...defaultOptions,
    ...queryProps,
  });