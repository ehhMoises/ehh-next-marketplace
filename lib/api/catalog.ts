import { Catalog } from '@/models/catalog';
import axios from './index';
import { AxiosError } from 'axios';

const context = 'stock';

export const addCatalog = async (data: Catalog) => {
  try {
    const response = await axios.post<Catalog>(`/${context}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const updateCatalog = async (data: Omit<Catalog, 'brandId' | 'gradeId' | 'packStyleId' | 'packSizeId'>) => {
  try {
    const response = await axios.post<Catalog>(`/${context}/${data.id}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};
