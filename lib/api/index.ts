import axios, { AxiosHeaders, RawAxiosRequestHeaders } from 'axios';
import { MethodsHeaders } from '@/models/http';
import Cookies from 'js-cookie';
import { TokenTypes } from '../cookies';

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
    if (response.config.url === '/login' && response.status === 200) {
      Cookies.set(TokenTypes.ACCESS_TOKEN, response?.data?.idToken, { sameSite: 'Lax' });
      // const redirectUrl = Cookies.get(TokenTypes.ACCESS_TOKEN);
      // Router.push(redirectUrl ?? Routes.ROOT);
    }

    return response;
  },
  (error) => {
    // const isAuthenticated = !(error.response.status === 401);
    return Promise.reject(error);
  }
);

export const buildServerSideHeaders = (
  accessToken?: string,
  originHeaders?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders
): (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders => {
  let headers: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders = {};
  if (accessToken) {
    const bearerToken = `Bearer ${accessToken}`;
    if (originHeaders) {
      headers = {
        ...originHeaders,
        Authorization: bearerToken,
      };
    } else {
      headers = {
        Authorization: bearerToken,
      };
    }
  }

  return headers;
};

export default instance;
