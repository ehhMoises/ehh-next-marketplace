import axios, { AxiosHeaders, RawAxiosRequestHeaders } from 'axios';
import { MethodsHeaders } from '@/models/http';
import { TokenTypes } from '../constant/cookies';
import { getCookie, setCookie } from '../cookie';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// https://github.com/axios/axios#interceptors
instance.interceptors.request.use((config) => {
  const token = getCookie(TokenTypes.ACCESS_TOKEN);

  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Return config
  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response.config.url === '/auth/login' && response.status === 200) {
      const tokens = response?.data as {
        idToken: string;
        refreshToken: string;
      };
      setCookie(TokenTypes.ACCESS_TOKEN, tokens.idToken);
      setCookie(TokenTypes.REFRESH_TOKEN, tokens.refreshToken);
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

// TODO: Token customizable, we need to decode it from token and serialize & type it, in order to get
//       in order to get current account type
// {
//   "sub": "845844b8-a0f1-7095-d216-aa32be6aaca6",
//   "email_verified": true,
//   "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_Ny9sbNPCU",
//   "cognito:username": "845844b8-a0f1-7095-d216-aa32be6aaca6",
//   "origin_jti": "a7cf9f93-d181-40e8-bde9-c2dc1ef93f05",
//   "aud": "1dftv5vjpj054h9dloq3v2de5",
//   "custom:account_type": "100",
//   "event_id": "84e3174f-71ec-481e-95b5-dc0c43953707",
//   "token_use": "id",
//   "auth_time": 1693372726,
//   "custom:account_id": "8f59a492-ecfe-4083-ab69-fe491dd05c2e",
//   "exp": 1693459126,
//   "iat": 1693372726,
//   "jti": "5182d710-b55d-49b1-8acd-9cd18e06dfcf",
//   "email": "moises+dev1@eharvesthub.com"
// }
