import { Grade } from '@/models/grade';
import axios from './index';
import { AxiosError } from 'axios';
import { ResponseHttpBase } from '@/models/http';

const context = 'grades';

export const getGradeById = async (id: string) => {
  try {
    const response = await axios.get<Grade>(`/${context}/${id}`);

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const getGrades = async () => {
  try {
    const {
      data: { data },
    } = await axios.get<ResponseHttpBase<Grade[]>>(`/${context}`);

    return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const addGrade = async (data: Grade) => {
  try {
    const response = await axios.post<Grade>(`/${context}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};

export const updateGrade = async (data: Grade) => {
  try {
    const response = await axios.post<Grade>(`/${context}/${data.id}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};
