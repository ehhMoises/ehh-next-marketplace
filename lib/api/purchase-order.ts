import axios, { buildServerSideHeaders } from './index';

const context = 'purchase-orders';

export const saveOrder = async ({ accessToken }: { accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const response = await axios.post<{
      orderIds: string[];
    }>(`/${context}`, {
      headers,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};
