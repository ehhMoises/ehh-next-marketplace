import { GROWING_METHOD_QUERY_KEYS } from '@/constants/growing-methods';
import { getGrowingMethods } from '@/lib/api/growingMethod';
import { useQuery } from '@tanstack/react-query';

const defaultOptions = {
  retry: false,
};

// Get all Brands
export const useGetGrowingMethodsQuery = (queryProps: any) =>
  useQuery([GROWING_METHOD_QUERY_KEYS.GET_GROWING_METHODS], () => getGrowingMethods(), {
    ...defaultOptions,
    ...queryProps,
  });
