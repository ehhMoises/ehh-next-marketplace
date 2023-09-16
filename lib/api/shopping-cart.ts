import { NewCartItemBody, ShoppingCart } from '@/models/shopping-cart';
import axios, { buildServerSideHeaders } from './index';
import { ResponseHttpBase } from '@/models/http';

const context = 'shopping-cart';

export const getCartsByUser = async ({ accessToken }: { accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const response = await axios.get<ResponseHttpBase<ShoppingCart[]>>(`/${context}`, {
      headers,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const addCartItem = async ({ accessToken, ...data }: NewCartItemBody & { accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const response = await axios.post(
      `/${context}`,
      {
        ...data,
      },
      {
        headers,
      }
    );

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const removeCartItem = async ({ accessToken, cartItem }: { cartItem: string; accessToken?: string }) => {
  try {
    const headers = buildServerSideHeaders(accessToken);
    const response = await axios.delete(`/${context}/${cartItem}`, {
      headers,
    });

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};
