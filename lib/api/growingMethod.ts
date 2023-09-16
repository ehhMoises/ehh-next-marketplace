import axios from './index';
import { GrowingMethodsResponse } from '@/models/growingMethod';

const context = 'enums/growing-methods';

export const getGrowingMethods = async () => {
  try {
    const response = await axios.get<GrowingMethodsResponse>(`/${context}`);
    return response?.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};
