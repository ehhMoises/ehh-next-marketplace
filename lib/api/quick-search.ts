import { PotentialGrowers, QuickSearchPotentialGrowersBody } from '@/models/targetSellers';
import axios, { buildServerSideHeaders } from './index';
import { ResponseHttpBase } from '@/models/http';
import { AxiosError } from 'axios';
import { QuickSearchOptions } from '@/models/product';

const context = 'quick-search';

export const getPossibleGrowersViaQuickSearch = async ({
  accessToken,
  ...data
}: QuickSearchPotentialGrowersBody & { accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const { data: potentialGrowersForPurchaseItems } = await axios.post<ResponseHttpBase<PotentialGrowers[]>>(
      `/${context}`,
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

export const getQuickSearchOptions = async ({ accessToken }: { accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const { data: options } = await axios.get<QuickSearchOptions>(`/${context}/options`, {
      headers,
    });

    return options;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};
