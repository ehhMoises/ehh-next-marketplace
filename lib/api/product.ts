import axios, { buildServerSideHeaders } from './index';
import { AxiosError } from 'axios';
import { ResponseHttpBase } from '@/models/http';
import { ProductPresentation } from '@/models/product';
import { PotentialGrowers, PotentialGrowersBody } from '@/models/targetSellers';

const context = 'cards';

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

export const getVarietiesProduct = async ({ commodity, accessToken }: { commodity: string; accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const {
      data: { data },
    } = await axios.get<ResponseHttpBase<ProductPresentation[]>>(`/${context}/commodities/${commodity}/varieties`, {
      headers,
    });

    return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const getPossibleGrowers = async ({ accessToken, ...data }: PotentialGrowersBody & { accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const { data: potentialGrowersForPurchaseItems } = await axios.post<ResponseHttpBase<PotentialGrowers[]>>(
      `/${context}/stock`,
      { ...data },
      {
        headers,
      }
    );

    return potentialGrowersForPurchaseItems;
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};
