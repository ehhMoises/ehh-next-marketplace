import { queryClient } from '@/app/provider';
import { useMutation } from '@tanstack/react-query';
import { updateAccount, createAddressAccount, updateAddressAccount } from '../api/account-user';
import { ACCOUNT_USER_QUERY_KEYS } from '@/constants/account-user';
import { IAccountBody, IAddressAccount, IAddressAccountBody } from '@/models/account-user';

export const useProfileMutation = () => {
  const {
    mutateAsync: applyUpdateAccount,
    isError: isErrorAccountUpdate,
    error: errorAccountUpdate,
    isLoading: isLoadingUpdateAccount,
    isSuccess: isSuccessUpdateAccount,
  } = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries([ACCOUNT_USER_QUERY_KEYS.GET_MY_ACCOUNT]);
    },
  });

  const {
    mutateAsync: applyCreateAddressAccount,
    isError: isErrorNewAddressAccount,
    error: errorNewAddressAccount,
    isLoading: isLoadingCreatedAddressAccount,
    isSuccess: isSuccessCreatedAddressAccount,
  } = useMutation({
    mutationFn: createAddressAccount,
    onSuccess: () => {
      queryClient.invalidateQueries([ACCOUNT_USER_QUERY_KEYS.GET_MY_ADDRESSES_ACCOUNT]);
    },
  });

  const {
    mutateAsync: applyUpdateAddressAccount,
    isError: isErrorUpdateAddressAccount,
    error: errorUpdateAddressAccount,
    isLoading: isLoadingUpdatedAddressAccount,
    isSuccess: isSuccessUpdatedAddressAccount,
  } = useMutation({
    mutationFn: updateAddressAccount,
    onSuccess: () => {
      queryClient.invalidateQueries([ACCOUNT_USER_QUERY_KEYS.GET_MY_ADDRESSES_ACCOUNT]);
    },
  });

  const mutateAddresses = async (addresses: IAddressAccountBody[]) => {
    const addressesMutated: IAddressAccount[] = [];
    for (const address of addresses) {
      if (address.id) {
        const updatedAddress = await applyUpdateAddressAccount({
          data: address,
          addressId: address.id,
        });
        addressesMutated.push(updatedAddress);
      } else {
        const createdAddress = await applyCreateAddressAccount({
          data: address,
        });
        addressesMutated.push(createdAddress);
      }
    }

    return addressesMutated;
  };

  const applyMutation = async ({ account, addresses }: { account: IAccountBody; addresses: IAddressAccountBody[] }) => {
    try {
      await Promise.all([
        applyUpdateAccount({
          data: account,
        }),
        mutateAddresses(addresses),
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    isError: isErrorAccountUpdate || isErrorNewAddressAccount || isErrorUpdateAddressAccount,
    applyMutation,
    error: {
      account: errorAccountUpdate,
      newAddress: errorNewAddressAccount,
      updateAddress: errorUpdateAddressAccount,
    },
    isLoading: isLoadingUpdateAccount || isLoadingCreatedAddressAccount || isLoadingUpdatedAddressAccount,
    isSuccess: isSuccessUpdateAccount || isSuccessCreatedAddressAccount || isSuccessUpdatedAddressAccount,
  };
};
