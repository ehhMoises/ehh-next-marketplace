import { useEffect, useState } from 'react';
import { getCookie } from '../cookie';

const useCookie = <T = string>(key: string) => {
  const [cookieValue, setCookieValue] = useState<T>();

  useEffect(() => {
    setCookieValue(getCookie(key) as T);
  }, [key]);

  return cookieValue;
};

export default useCookie;
