import { Grade, IGrade } from '@/models/grade';
import axios, { buildServerSideHeaders } from './index';
import { ResponseHttpBase } from '@/models/http';

const context = 'grades';

export const getGradeById = async (id: string) => {
  try {
    const response = await axios.get<Grade>(`/${context}/${id}`);

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getGrades = async ({ accessToken }: { accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const {
      data: { data },
    } = await axios.get<ResponseHttpBase<Grade[]>>(`/${context}`, {
      headers,
    });

    return data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const addGrade = async (data: IGrade) => {
  try {
    const response = await axios.post<Grade>(`/${context}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const updateGrade = async (data: Grade) => {
  try {
    const response = await axios.put<Grade>(`/${context}/${data.id}`, {
      ...data,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};
