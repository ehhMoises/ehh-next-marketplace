import { queryClient } from "@/app/provider";
import { USERS_QUERY_KEYS } from "@/constants/users";
import { addUser, updateUser } from "@/lib/api/users";
import { useMutation } from "@tanstack/react-query";

export const useCreateUserdMutation = () =>
  useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries([USERS_QUERY_KEYS.GET_USERS]);
    },
  });

export const useUpdateUserMutation = () =>
  useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries([USERS_QUERY_KEYS.GET_USERS]);
    },
  });