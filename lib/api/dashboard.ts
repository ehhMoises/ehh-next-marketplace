import axios from './index';
import { ResponseHttpBase } from '@/models/http';

const context = 'dashboards';

export const getDashboard = async () => {
  try {
    const response = await axios.get(`/${context}`);
    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};