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

export const getOrderById = async (id: string) => {
  try {
    const response = await axios.get(`/${context}/${id}`);
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

// TODO: Check this
export const addOrder = async (data: any) => {
  try {
    const response = await axios.post(`/${context}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const updateOrder = async (data: PurchaseOrderDetail) => {
  try {
    const response = await axios.put(`/${context}/${data.id}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const updateStatusOrder = async (data: PurchaseOrderDetail) => {
  try {
    const response = await axios.put(`/${context}/${data.id}/status`, {
      status: Number.parseInt(data.status.id.toString(), 10),
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};
