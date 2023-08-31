import { PACK_STYLE_QUERY_KEYS } from '@/constants/pack-style';
import { getPackStyleById, getPackStyles } from '@/lib/api/packStyle';
import { useQuery } from '@tanstack/react-query';

const defaultOptions = {
  retry: false,
};

// Get all Brands
export const useGetPackStyleQuery = (queryProps: any) =>
  useQuery([PACK_STYLE_QUERY_KEYS.GET_PACK_STYLES], () => getPackStyles({}), {
    ...defaultOptions,
    ...queryProps,
  });

  export const useGetPackStyleByIdQuery = (id: string, queryProps: any) =>
  useQuery([PACK_STYLE_QUERY_KEYS.GET_PACK_STYLE_BY_ID, id], () => getPackStyleById(id), {
    ...defaultOptions,
    ...queryProps,
  });