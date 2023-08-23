import { PackStyle } from '@/models/packStyle';
import axios from './index';
import { AxiosError } from 'axios';

const context = 'pack-styles';

export const getPackStyleById = async (id: string) => {
  try {
    const response = await axios.get<PackStyle>(`/${context}/${id}`);

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const getPackStyles = async () => {
  try {
    const response = await axios.get<PackStyle[]>(`/${context}`);

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const addPackStyle = async (data: PackStyle) => {
  try {
    const response = await axios.post<PackStyle>(`/${context}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const updatePackStyle = async (data: PackStyle) => {
  try {
    const response = await axios.post<PackStyle>(`/${context}/${data.id}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};
