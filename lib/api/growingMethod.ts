import axios from './index';
import { AxiosError } from 'axios';
import { GrowingMethod } from '@/models/growingMethod';

const context = 'growing-methods';

export const getGrowingMethods = async () => {
  try {
    const response = await axios.get<GrowingMethod[]>(`/${context}`);

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) throw err?.response?.data;
  }
};
