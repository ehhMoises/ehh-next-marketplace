import { BRAND_QUERY_KEYS } from '@/constants/brand';
import { getBrands } from '@/lib/api/brand';
import { useQuery } from '@tanstack/react-query';

const defaultOptions = {
  retry: false,
};

// Get all Brands
export const useGetBrandsQuery = (queryProps: any) =>
  useQuery([BRAND_QUERY_KEYS.GET_BRANDS], () => getBrands(), {
    ...defaultOptions,
    ...queryProps,
  });
