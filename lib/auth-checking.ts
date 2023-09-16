import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { TokenTypes } from './constant/cookies';
import { getUserMe } from './api/account-user';
import { redirect } from 'next/navigation';

export const applyAuthorizationOperations = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(TokenTypes.ACCESS_TOKEN)?.value;

  try {
    const me = await getUserMe({ accessToken });

    return me;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        redirect('/');
      }
    }
  }
};
