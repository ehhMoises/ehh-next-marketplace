import { ResponseHttpBase } from '@/models/http';
import axios, { buildServerSideHeaders } from './index';
import { PurchaseOrderDetail, PurchaseOrderList } from '@/models/purchase-order';

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

export const getOrders = async () => {
  try {
    const response = await axios.get(`/${context}`);
    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getOrderList = async ({ accessToken }: { accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const response = await axios.get<ResponseHttpBase<PurchaseOrderList>>(`/${context}`, {
      headers,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getOrderDetail = async ({ accessToken, orderId }: { orderId: string; accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const response = await axios.get<PurchaseOrderDetail>(`/${context}/${orderId}`, {
      headers,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};
