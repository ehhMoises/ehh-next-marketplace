import { IPackSize, PackSize } from '@/models/packSize';
import axios, { buildServerSideHeaders } from './index';
import { ResponseHttpBase } from '@/models/http';

const context = 'pack-sizes';

export const getPackSizeById = async (id: string) => {
  try {
    const response = await axios.get<PackSize>(`/${context}/${id}`);

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getPackSizeList = async ({ accessToken }: { accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const {
      data: { data },
    } = await axios.get<ResponseHttpBase<PackSize[]>>(`/${context}`, {
      headers,
    });

    return data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getPackSizeListByPackStyleId = async (packStyleId: string) => {
  try {
    const response = await axios.get(`/pack-styles/${packStyleId}/${context}/`);
    console.log('response.data', response.data);
    return response.data.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const addPackSize = async (data: IPackSize) => {
  try {
    const response = await axios.post<IPackSize>(`/${context}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const updatePackSize = async (data: PackSize) => {
  try {
    const response = await axios.put<PackSize>(`/${context}/${data.id}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};
