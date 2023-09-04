import { queryClient } from "@/app/provider";
import { STOCK_QUERY_KEYS } from "@/constants/stock";
import { addCatalog, updateCatalog } from "@/lib/api/catalog";
import { useMutation } from "@tanstack/react-query";

export const useCreateCatalogMutation = () =>
  useMutation({
    mutationFn: addCatalog,
    onSuccess: () => {
      queryClient.invalidateQueries([STOCK_QUERY_KEYS.GET_STOCKS]);
    },
  });

export const useUpdateCatalogMutation = () =>
  useMutation({
    mutationFn: updateCatalog,
    onSuccess: () => {
      queryClient.invalidateQueries([STOCK_QUERY_KEYS.GET_STOCKS]);
      queryClient.invalidateQueries([STOCK_QUERY_KEYS.GET_STOCK_BY_ID]);
    },
  });