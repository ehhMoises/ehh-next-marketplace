import { ErrorDetail } from '@/models/errorDetail';
import axios from './index';
import { AxiosError } from 'axios';

const context = 'auth';

export const signUp = async ({
  accountType,
  companyName,
  email,
  password,
}: {
  companyName: string;
  accountType: number;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post<void>(`/${context}/signup`, {
      companyName,
      accountType,
      email,
      password,
    });

    if (response.status === 200) {
      return true;
    }

    return false;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      const error = new ErrorDetail({
        ...err?.response?.data,
      });

      throw error;
    }
  }
};

export const confirmCode = async ({ email, code }: { email: string; code: string }) => {
  try {
    const response = await axios.post<void>(`/${context}/confirm`, {
      email,
      code,
    });

    if (response.status === 200) {
      return true;
    }

    return false;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      const error = new ErrorDetail({
        ...err?.response?.data,
      });

      throw error;
    }
  }
};

export const resendConfirmation = async ({ email }: { email: string }) => {
  try {
    const response = await axios.post<void>(`/${context}/resend-confirmation`, {
      email,
    });

    if (response.status === 200) {
      return true;
    }

    return false;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      const error = new ErrorDetail({
        ...err?.response?.data,
      });

      throw error;
    }
  }
};

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await axios.post<{
      idToken: string;
      accessToken: string;
      refreshToken: string;
    }>(`/${context}/login`, {
      email,
      password,
    });

    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      const error = new ErrorDetail({
        ...err?.response?.data,
      });

      throw error;
    }
  }
};
