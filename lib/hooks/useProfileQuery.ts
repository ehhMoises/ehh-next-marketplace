import { useQuery } from '@tanstack/react-query';
import { getMyAccount, getMyAddressesAccount } from '../api/account-user';
import { ACCOUNT_USER_QUERY_KEYS } from '@/constants/account-user';

export const useGetProfileQuery = () => {
  const {
    data: account,
    isLoading,
    isFetching,
    error: errorAccount,
    isError: isErrorAccount,
  } = useQuery([ACCOUNT_USER_QUERY_KEYS.GET_MY_ACCOUNT], () => getMyAccount({}), {
    retry: false,
  });

  const {
    data: rawAddresses,
    isLoading: isFetchingAddressesAccount,
    isFetching: isLoadingAddressesAccount,
    error: errorAddressAccount,
    isError: isErrorAddressAccount,
  } = useQuery([ACCOUNT_USER_QUERY_KEYS.GET_MY_ADDRESSES_ACCOUNT], () => getMyAddressesAccount({}), {
    enabled: !!account?.id,
    retry: false,
  });

  const addresses = rawAddresses?.data ?? [];

  return {
    addresses,
    account,
    isLoadingAddresses: isLoadingAddressesAccount || isFetchingAddressesAccount,
    isLoadingAccount: isLoading || isFetching,
    isError: isErrorAccount || isErrorAddressAccount,
    error: {
      account: errorAccount,
      address: errorAddressAccount,
    },
  };
};
