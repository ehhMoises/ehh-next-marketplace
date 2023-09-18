import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { TokenTypes } from './constant/cookies';
import { getUserMe } from './api/account-user';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AccountType } from '@/models/account-user';

export const applyAuthorizationOperations = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(TokenTypes.ACCESS_TOKEN)?.value;

  if (!accessToken) {
    return undefined;
  }

  try {
    const me = await getUserMe({ accessToken });

    if (me) {
      const headersList = headers();
      const headerURL = headersList.get('x-url') || '';

      if (headerURL.includes('/grower') && me.account.type.name === AccountType.Buyer) {
        throw new Error('RETAILER_INCORRECT_SECTION');
      } else if (headerURL.includes('/retailer') && me.account.type.name === AccountType.Grower) {
        throw new Error('GROWER_INCORRECT_SECTION');
      }
    }

    return me;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'RETAILER_INCORRECT_SECTION') {
        redirect('/retailer/home');
      } else if (error.message === 'GROWER_INCORRECT_SECTION') {
        redirect('/grower/home');
      }
    }

    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        redirect('/');
      }
    }
  }
};
