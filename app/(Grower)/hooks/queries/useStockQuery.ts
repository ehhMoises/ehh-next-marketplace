
import { STOCK_QUERY_KEYS } from '@/constants/stock';
import { getCatalogById, getCatalogs } from '@/lib/api/catalog';
import { useQuery } from '@tanstack/react-query';

const defaultOptions = {
  retry: false,
};

// Get all Brands
export const useGetCatalgsQuery = (queryProps: any) =>
  useQuery([STOCK_QUERY_KEYS.GET_STOCKS], () => getCatalogs(), {
    ...defaultOptions,
    ...queryProps,
  });

  export const useGetCatalogByIdQuery = (id: string, queryProps: any) =>
  useQuery([STOCK_QUERY_KEYS.GET_STOCK_BY_ID, id], () => getCatalogById(id), {
    ...defaultOptions,
    ...queryProps,
  });