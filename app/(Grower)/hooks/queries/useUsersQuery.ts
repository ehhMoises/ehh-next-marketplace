import { USERS_QUERY_KEYS } from '@/constants/users';
import { getUserById, getUserStatuses, getUserTypes, getUsers } from '@/lib/api/users';
import { useQuery } from '@tanstack/react-query';

const defaultOptions = {
  retry: false,
};

export const useGetUsersQuery = (queryProps: any) =>
  useQuery([USERS_QUERY_KEYS.GET_USERS], () => getUsers(), {
    ...defaultOptions,
    ...queryProps,
  });

export const useGetUsersByIdQuery = (id: string, queryProps: any) =>
  useQuery([USERS_QUERY_KEYS.GET_USER_BY_ID, id], () => getUserById(id), {
    ...defaultOptions,
    ...queryProps,
  });

  export const useGetUserTypesQuery = (queryProps: any) =>
  useQuery([USERS_QUERY_KEYS.GET_USER_TYPES], () => getUserTypes(), {
    ...defaultOptions,
    ...queryProps,
  });

  export const useGetUserStatusesQuery = (queryProps: any) =>
  useQuery([USERS_QUERY_KEYS.GET_USER_STATUSES], () => getUserStatuses(), {
    ...defaultOptions,
    ...queryProps,
  });