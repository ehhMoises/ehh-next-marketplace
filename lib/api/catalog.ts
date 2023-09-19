import { Catalog, ICatalog, ICatalogUpdate, StockCatalog } from '@/models/catalog';
import axios from './index';
import { ResponseHttpBase } from '@/models/http';

const context = 'stock';

export const getCatalogById = async (id: string) => {
  try {
    const response = await axios.get<StockCatalog>(`/${context}/${id}`);

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getCatalogs = async () => {
  try {
    const {
      data: { data },
    } = await axios.get<ResponseHttpBase<StockCatalog[]>>(`/${context}`);
    return data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const addCatalog = async (data: ICatalog) => {
  try {
    const response = await axios.post<ICatalog>(`/${context}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const updateCatalog = async (data: ICatalogUpdate) => {
  try {
    const response = await axios.put<Catalog>(`/${context}/${data.id}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};
