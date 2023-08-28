import { PackSize } from '@/models/packSize';
import axios from './index';
import { AxiosError } from 'axios';
import { ResponseHttpBase } from '@/models/http';

const context = 'pack-sizes';

export const getPackSizeById = async (id: string) => {
  try {
    const response = await axios.get<PackSize>(`/${context}/${id}`);

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const getPackSizeList = async () => {
  try {
    const {
      data: { data },
    } = await axios.get<ResponseHttpBase<PackSize[]>>(`/${context}`);

    return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const addPackSize = async (data: PackSize) => {
  try {
    const response = await axios.post<PackSize>(`/${context}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const updatePackSize = async (data: PackSize) => {
  try {
    const response = await axios.post<PackSize>(`/${context}/${data.id}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};