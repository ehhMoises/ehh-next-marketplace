import { queryClient } from "@/app/provider";
import { BRAND_QUERY_KEYS } from "@/constants/brand";
import { addBrand } from "@/lib/api/brand";
import { useMutation } from "@tanstack/react-query";

export const useCreateBrandMutation = () =>
  useMutation({
    mutationFn: addBrand,
    onSuccess: () => {
      queryClient.invalidateQueries([BRAND_QUERY_KEYS.GET_BRANDS]);
    },
  });