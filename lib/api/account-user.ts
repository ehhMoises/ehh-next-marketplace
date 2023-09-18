import { ResponseHttpBase } from '@/models/http';
import axios, { buildServerSideHeaders } from './index';
import { IAccountBody, IAccountMe, IAddressAccount, IAddressAccountBody, IUserMe } from '@/models/account-user';

const myAccountContext = 'my-account';
const meContext = 'me';

export const getMyAccount = async ({ accessToken }: { accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const response = await axios.get<IAccountMe>(`/${myAccountContext}`, {
      headers,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getUserMe = async ({ accessToken }: { accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const response = await axios.get<IUserMe>(`/${meContext}`, {
      headers,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const updateAccount = async ({ accessToken, data }: { data: IAccountBody; accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const response = await axios.put<{
      orderIds: string[];
    }>(
      `/${myAccountContext}`,
      {
        ...data,
      },
      {
        headers,
      }
    );

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getMyAddressesAccount = async ({ accessToken }: { accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const response = await axios.get<ResponseHttpBase<IAddressAccount[]>>(`/${myAccountContext}/addresses`, {
      headers,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const createAddressAccount = async ({
  accessToken,
  data,
}: {
  data: Omit<IAddressAccountBody, 'id'>;
  accessToken?: string;
}) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const response = await axios.post<IAddressAccount>(
      `/${myAccountContext}/addresses`,
      {
        ...data,
      },
      {
        headers,
      }
    );

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const updateAddressAccount = async ({
  accessToken,
  data,
  addressId,
}: {
  addressId: string;
  data: Omit<IAddressAccountBody, 'id'>;
  accessToken?: string;
}) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const response = await axios.put<IAddressAccount>(
      `/${myAccountContext}/addresses/${addressId}`,
      {
        ...data,
      },
      {
        headers,
      }
    );

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};
