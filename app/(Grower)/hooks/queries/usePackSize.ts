import { PACK_SIZE_QUERY_KEYS } from '@/constants/pack-size';
import { getPackSizeById, getPackSizeList } from '@/lib/api/packSize';
import { useQuery } from '@tanstack/react-query';

const defaultOptions = {
  retry: false,
};

// Get all Pack Sizes
export const useGetPackSizesQuery = (queryProps: any) =>
  useQuery([PACK_SIZE_QUERY_KEYS.GET_PACK_SIZES], () => getPackSizeList({}), {
    ...defaultOptions,
    ...queryProps,
  });

export const useGetPackSizeByIdQuery = (id: string, queryProps: any) =>
  useQuery([PACK_SIZE_QUERY_KEYS.GET_PACK_SIZE_BY_ID, id], () => getPackSizeById(id), {
    ...defaultOptions,
    ...queryProps,
  });
