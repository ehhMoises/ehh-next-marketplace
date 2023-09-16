import axios, { buildServerSideHeaders } from './index';
import { IAccountMe, IUserMe } from '@/models/account-user';

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
