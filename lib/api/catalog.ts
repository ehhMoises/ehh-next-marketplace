import { Catalog, StockCatalog } from '@/models/catalog';
import axios from './index';
import { AxiosError } from 'axios';
import { ResponseHttpBase } from '@/models/http';

const context = 'stock';

export const getCatalogById = async (id: string) => {
  try {
    const response = await axios.get<StockCatalog>(`/${context}/${id}`);

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const getCatalogs = async () => {
  try {
    const {
      data: { data },
    } = await axios.get<ResponseHttpBase<StockCatalog[]>>(`/${context}`);

    return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const addCatalog = async (data: Catalog) => {
  try {
    const response = await axios.post<{
      productId: string;
      stockId: string;
    }>(`/${context}`, {
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