'use client';

import { getUserMe } from '@/lib/api/account-user';
import { signIn } from '@/lib/api/auth';
import { AccountType } from '@/models/account-user';
import { ErrorDetail } from '@/models/errorDetail';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const useSignIn = () => {
  const router = useRouter();
  const { mutateAsync, isLoading, isSuccess, isError, reset, error } = useMutation(signIn);
  const [isCheckingSignIn, setIsCheckingSignIn] = useState(false);

  const updateIsCheckingSigIn = (isChecking: boolean) => {
    setIsCheckingSignIn(isChecking);
  };

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      updateIsCheckingSigIn(true);
      const tokens = await mutateAsync({
        email,
        password,
      });
      const me = await getUserMe({ accessToken: tokens?.idToken });

      if (tokens && tokens.idToken && tokens.refreshToken) {
        updateIsCheckingSigIn(false);
        if (me.account.type.name === AccountType.Buyer) {
          router.replace('/search');
        } else {
          router.replace('/grower/home');
        }
      }
    } catch (err) {
      updateIsCheckingSigIn(false);
      console.log(err);
    }
  };

  return {
    login,
    isSigningIn: isLoading || isCheckingSignIn,
    isSuccess,
    isError,
    reset,
    error: error as ErrorDetail,
  };
};

export default useSignIn;
