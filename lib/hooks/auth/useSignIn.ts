'use client';

import { signIn } from '@/lib/api/auth';
import { ErrorDetail } from '@/models/errorDetail';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useSignIn = () => {
  const router = useRouter();
  const { mutateAsync, isLoading: isSigningIn, isSuccess, isError, reset, error } = useMutation(signIn);

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const tokens = await mutateAsync({
        email,
        password,
      });

      if (tokens && tokens.idToken && tokens.refreshToken) {
        router.replace('/search');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    login,
    isSigningIn,
    isSuccess,
    isError,
    reset,
    error: error as ErrorDetail,
  };
};

export default useSignIn;
