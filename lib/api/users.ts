import axios from './index';

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