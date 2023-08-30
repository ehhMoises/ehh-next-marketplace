import { signIn } from '@/lib/api/auth';
import { ErrorDetail } from '@/models/errorDetail';
import { useMutation } from '@tanstack/react-query';

const useSignIn = () => {
  const { mutateAsync, isLoading: isSigningIn, isSuccess, isError, reset, error } = useMutation(signIn);

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      await mutateAsync({
        email,
        password,
      });
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
