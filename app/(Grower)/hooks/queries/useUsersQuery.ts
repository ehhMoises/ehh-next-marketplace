import { USERS_QUERY_KEYS } from '@/constants/users';
import { getUsers } from '@/lib/api/users';
import { useQuery } from '@tanstack/react-query';

const defaultOptions = {
  retry: false,
};

export const useGetUsersQuery = (queryProps: any) =>
  useQuery([USERS_QUERY_KEYS.GET_USERS], () => getUsers(), {
    ...defaultOptions,
    ...queryProps,
  });