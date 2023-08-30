import Cookies from 'js-cookie';

export const getCookie = (key: string) => Cookies.get(key);
export const setCookie = (key: string, value: string) => Cookies.set(key, value, { sameSite: 'Lax' });
