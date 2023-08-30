import { resendConfirmation } from '@/lib/api/auth';
import { ErrorDetail } from '@/models/errorDetail';
import { useMutation } from '@tanstack/react-query';

const useResendCode = () => {
  const { mutateAsync, isLoading: isResendingCode, isSuccess, isError, reset, error } = useMutation(resendConfirmation);

  const resendCode = async ({ email }: { email: string }) => {
    try {
      const hasReSent = await mutateAsync({
        email,
      });

      return hasReSent;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    resendCode,
    isResendingCode,
    isSuccess,
    isError,
    reset,
    error: error as ErrorDetail,
  };
};

export default useResendCode;
