import { signUp } from '@/lib/api/auth';
import { ErrorDetail } from '@/models/errorDetail';
import { useMutation } from '@tanstack/react-query';

const useSignUp = () => {
  const { mutateAsync, isLoading: isSigningUp, isSuccess, isError, reset, error } = useMutation(signUp);

  const register = async ({
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
      await mutateAsync({
        accountType,
        companyName,
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    register,
    isSigningUp,
    isSuccess,
    isError,
    reset,
    error: error as ErrorDetail,
  };
};

export default useSignUp;
