import axios from './index';
import { AxiosError } from 'axios';
import { Brand } from '@/models/brand';
import { ResponseHttpBase } from '@/models/http';
import { GrowingMethod } from '@/models/growingMethod';

const context = 'brands';

export const getBrandById = async (id: string) => {
  try {
    const response = await axios.get<Brand>(`/${context}/${id}`);

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const getBrands = async () => {
  try {
    const response = await axios.get<ResponseHttpBase<Brand<GrowingMethod>[]>>(`/${context}`);

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const addBrand = async (data: Brand) => {
  try {
    const response = await axios.post<Brand<Brand>>(`/${context}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const updateBrand = async (data: Brand) => {
  try {
    const response = await axios.post<Brand<Brand>>(`/${context}/${data.id}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};
