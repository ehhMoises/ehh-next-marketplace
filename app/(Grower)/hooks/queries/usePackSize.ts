import { PACK_SIZE_QUERY_KEYS } from '@/constants/pack-size';
import { getPackSizeList } from '@/lib/api/packSize';
import { useQuery } from '@tanstack/react-query';

const defaultOptions = {
  retry: false,
};

// Get all Brands
export const useGetPackSizesQuery = (queryProps: any) =>
  useQuery([PACK_SIZE_QUERY_KEYS.GET_PACK_SIZES], () => getPackSizeList({}), {
    ...defaultOptions,
    ...queryProps,
  });