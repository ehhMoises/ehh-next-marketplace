import { IPackStyle, PackStyle } from '@/models/packStyle';
import axios, { buildServerSideHeaders } from './index';
import { ResponseHttpBase } from '@/models/http';
import { PackSize } from '@/models/packSize';

const context = 'pack-styles';

export const getPackStyleById = async (id: string) => {
  try {
    const response = await axios.get<PackStyle>(`/${context}/${id}`);

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getPackStyles = async ({ accessToken }: { accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const {
      data: { data },
    } = await axios.get<ResponseHttpBase<PackStyle[]>>(`/${context}`, {
      headers,
    });

    return data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getPackSizeListById = async (id: string) => {
  try {
    const {
      data: { data },
    } = await axios.get<ResponseHttpBase<PackSize[]>>(`/${context}/${id}/pack-sizes`);

    return data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const addPackStyle = async (data: IPackStyle) => {
  try {
    const response = await axios.post<IPackStyle>(`/${context}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const updatePackStyle = async (data: PackStyle) => {
  try {
    const response = await axios.put<PackStyle>(`/${context}/${data.id}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};
