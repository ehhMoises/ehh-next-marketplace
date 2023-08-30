import axios, { buildServerSideHeaders } from './index';
import { AxiosError } from 'axios';
import { ResponseHttpBase } from '@/models/http';
import { ProductPresentation } from '@/models/product';
import { PotentialGrowers, PotentialGrowersBody, QuickSearchPotentialGrowersBody } from '@/models/targetSellers';

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

export const getVarietiesProduct = async ({ brandId, accessToken }: { brandId: string; accessToken?: string }) => {
  try {
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

export const getPossibleGrowers = async ({ accessToken, ...data }: PotentialGrowersBody & { accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const { data: potentialGrowersForPurchaseItems } = await axios.post<ResponseHttpBase<PotentialGrowers[]>>(
      `/${context}/seller-search`,
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

export const getPossibleGrowersViaQuickSearch = async ({
  accessToken,
  ...data
}: QuickSearchPotentialGrowersBody & { accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const { data: potentialGrowersForPurchaseItems } = await axios.post<ResponseHttpBase<PotentialGrowers[]>>(
      `/${context}/quick`,
      { ...data },
      {
        headers,
      }
    );

    return potentialGrowersForPurchaseItems;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};
