import { Grade } from '@/models/grade';
import axios from './index';
import { AxiosError, AxiosHeaders, RawAxiosRequestHeaders } from 'axios';
import { MethodsHeaders, ResponseHttpBase } from '@/models/http';
import { ProductPresentation } from '@/models/product';

const context = 'search';

const buildServerSideHeaders = (
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

export const getPlaceholdersBrand = async () => {
  try {
    const response = await axios.get<ResponseHttpBase<ProductPresentation>>(`/${context}/placeholders`);

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const getCommoditiesProduct = async (accessToken?: string) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const response = await axios.get<ResponseHttpBase<ProductPresentation>>(`/${context}/commodities`, {
      headers,
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const getVarietiesProduct = async ({ brandId, accessToken }: { brandId: string; accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const response = await axios.get<Grade>(`/${context}/commodities/${brandId}/varieties`, {
      headers,
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};
