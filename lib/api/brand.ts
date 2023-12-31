import axios, { buildServerSideHeaders } from './index';
import { Brand, IBrand } from '@/models/brand';
import { ResponseHttpBase } from '@/models/http';
import { GrowingMethod } from '@/models/growingMethod';

const context = 'brands';

export const getBrandById = async (id: string) => {
  try {
    const response = await axios.get<IBrand<GrowingMethod>>(`/${context}/${id}`);

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getBrands = async ({ accessToken }: { accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const response = await axios.get<ResponseHttpBase<Brand<GrowingMethod>[]>>(`/${context}`, {
      headers,
    });
    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const addBrand = async (data: IBrand) => {
  try {
    const response = await axios.post<IBrand<GrowingMethod>>(`/${context}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const updateBrand = async (data: Brand) => {
  try {
    const response = await axios.put<IBrand<GrowingMethod>>(`/${context}/${data.id}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};
