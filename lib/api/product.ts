import axios, { buildServerSideHeaders } from './index';
import { AxiosError } from 'axios';
import { ResponseHttpBase } from '@/models/http';
import { ProductPresentation } from '@/models/product';

const context = 'search';

export const getPlaceholdersBrand = async () => {
  try {
    const response = await axios.get<ResponseHttpBase<ProductPresentation[]>>(`/${context}/placeholders`);

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const getCommoditiesProduct = async (accessToken?: string) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const response = await axios.get<ResponseHttpBase<ProductPresentation[]>>(`/${context}/commodities`, {
      headers,
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const getVarietiesProduct = async ({ brandId, accessToken }: { brandId: string; accessToken?: string }) => {
  try {
    console.log('brandId', brandId);
    const headers = buildServerSideHeaders(accessToken);
    const {
      data: { data },
    } = await axios.get<ResponseHttpBase<ProductPresentation[]>>(`/${context}/commodities/${brandId}/varieties`, {
      headers,
    });

    return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};
