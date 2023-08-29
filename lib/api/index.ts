import axios, { AxiosHeaders, RawAxiosRequestHeaders } from 'axios';
import { MethodsHeaders } from '@/models/http';
import Cookies from 'js-cookie';
import { TokenTypes } from '../cookies';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// https://github.com/axios/axios#interceptors
instance.interceptors.request.use((config) => {
  // const token = Cookies.get(TokenTypes.ACCESS_TOKEN);
  const token = "eyJraWQiOiIyRUF0WllWSjR4TFFjXC91ekFxcGRGSnZTYTczWXpRNkR2VittTFJUdFwvN3c9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJmNDU4YzRkOC1mMDIxLTcwMDEtYjljNC04YzgxNmRiYjdlMDIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfTnk5c2JOUENVIiwiY29nbml0bzp1c2VybmFtZSI6ImY0NThjNGQ4LWYwMjEtNzAwMS1iOWM0LThjODE2ZGJiN2UwMiIsIm9yaWdpbl9qdGkiOiJlYmM0OWM4Yi1hYTYxLTQxMjQtOGZkZS0zMTg0MzA1OTBiMDAiLCJhdWQiOiIxZGZ0djV2anBqMDU0aDlkbG9xM3YyZGU1IiwiY3VzdG9tOmFjY291bnRfdHlwZSI6IjEwMCIsImV2ZW50X2lkIjoiYzU0N2I4ZGEtM2YzZi00MThhLWJhNmItOGRhZDg2ZDMxYWE2IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2OTMzNDE5MDksImN1c3RvbTphY2NvdW50X2lkIjoiN2U4ODNjZGItYWIyMS00NjJiLWI0MTAtNjY3MDVlNTY2YTZiIiwiZXhwIjoxNjkzNDI4MzA5LCJpYXQiOjE2OTMzNDE5MDksImp0aSI6IjYzMWFkMzVkLTE4NmEtNDBlMS04N2ZiLTllMzE3ZTg4NDJlMSIsImVtYWlsIjoibm9lbGZsb3Jlc3JAZ21haWwuY29tIn0.Q87_bRY4ytwG8neWo99jOyos193iauQ_ParjhMYymrHLIC3h-DIPrd7Gh0d9sdWUc0EkRLuWmodIwdWJv8lsHFToOoKaQD_zpyZIcx1eK_w0O2eLDmvq6OidqL_ARKBBCwRQZntXuq0aVtbgYsBcT2S5_yUlmXnITSEkmZg-wKgOws_ul8pnbQLOSQlv2vMD27X4HzsY-fLBNybWb1swBwN0S8xAfVWVRXamHXcmhX_42Xab-8hjv_9ykD1INpjXYvoG-Xhh30ZxVLmBltuoI_EcP4rVa-1FCQgoMuyLIv6E1ePLZnTHvCJ92W8IjxPpfMbdBULf3XpIzHW1Fja85g"

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
