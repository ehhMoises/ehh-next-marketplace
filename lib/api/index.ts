import axios from 'axios';
import Cookies from 'js-cookie';

export const enum TokenTypes {
  ACCESS_TOKEN = 'access-token',
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// https://github.com/axios/axios#interceptors
instance.interceptors.request.use((config) => {
  const token = Cookies.get(TokenTypes.ACCESS_TOKEN);

  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Return config
  return config;
});

instance.interceptors.response.use(
  (response) => {
    // if (response.config.url === '/signin' && response.status === 200) {
    //   Cookies.set(TokenTypes.ACCESS_TOKEN, response?.data?.accessToken, { sameSite: 'Lax' });
    //   // const redirectUrl = Cookies.get(TokenTypes.ACCESS_TOKEN);
    //   window.sessionStorage.removeItem('redirectUrl');
    //   // Router.push(redirectUrl ?? Routes.ROOT);
    // }

    return response;
  },
  (error) => {
    // const isAuthenticated = !(error.response.status === 401);
    return Promise.reject(error);
  }
);

export default instance;
