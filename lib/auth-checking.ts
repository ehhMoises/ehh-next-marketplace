import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { TokenTypes } from './constant/cookies';
import { getUserMe } from './api/account-user';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AccountType } from '@/models/account-user';

export const applyAuthorizationOperations = async (isHomePage: boolean = false) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(TokenTypes.ACCESS_TOKEN)?.value;

  try {
    const me = await getUserMe({ accessToken });

    if (me) {
      const headersList = headers();
      const headerURL = headersList.get('x-url') || '';
      const host = headersList.get('x-hostname') || '';

      if (headerURL.includes('/grower') && me.account.type.name === AccountType.Buyer) {
        throw new Error('RETAILER_INCORRECT_SECTION');
      } else if (me.account.type.name === AccountType.Grower) {
        const growersHeadersUrlToPrevent = ['/retailer', '/search', '/orders', '/checkout'];
        const urlMatch = headerURL.split(host)[1];
        const isOrderMatchUrl = urlMatch.includes('/grower/orders');
        const growerMatchForbiddenURL = growersHeadersUrlToPrevent.some((currentHeaderUrl) => {
          if (currentHeaderUrl.includes('/orders') && isOrderMatchUrl) {
            return false;
          }

          return headerURL.includes(currentHeaderUrl);
        });
        if (growerMatchForbiddenURL) {
          throw new Error('GROWER_INCORRECT_SECTION');
        }
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
      if (error.response?.status === 401 && !isHomePage) {
        redirect('/');
      }
    }
  }
};
