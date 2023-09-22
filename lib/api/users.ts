import { IUser } from '@/models/users';
import axios from './index';
import { IEnum, IEnumResponse } from '@/models/enum';

const context = 'users';

export const getUsers = async () => {
  try {
    const response = await axios.get(`/${context}`);
    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(`/${context}/${id}`);
    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
}

export const getUserTypes = async () => {
  try {
    const response = await axios.get<IEnumResponse>(`/enums/user-types`);
    return response.data?.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
}

export const getUserStatuses = async () => {
  try {
    const response = await axios.get<IEnumResponse>(`/enums/user-statuses`);
    return response.data.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
}

export const addUser = async (data: any) => {
  try {
    const response = await axios.post(`/${context}`, {
      ...data,
    });
    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
}


export const updateUser = async (data: IUser) => {
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
