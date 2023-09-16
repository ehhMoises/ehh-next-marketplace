import Cookies from 'js-cookie';
import { PRODUCT_CARD_MODE_KEY, QUERY_SEARCH_POTENTIAL_GROWERS, TokenTypes } from './constant/cookies';

export const getCookie = (key: string) => Cookies.get(key);
export const setCookie = (key: string, value: string) => Cookies.set(key, value, { sameSite: 'Lax' });

export const removeAllCookies = () => {
  Cookies.remove(TokenTypes.ACCESS_TOKEN, { sameSite: 'Lax' });
  Cookies.remove(TokenTypes.REFRESH_TOKEN, { sameSite: 'Lax' });
  Cookies.remove(PRODUCT_CARD_MODE_KEY, { sameSite: 'Lax' });
  Cookies.remove(QUERY_SEARCH_POTENTIAL_GROWERS, { sameSite: 'Lax' });
};
