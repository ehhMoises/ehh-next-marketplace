import { confirmCode } from '@/lib/api/auth';
import { ErrorDetail } from '@/models/errorDetail';
import { useMutation } from '@tanstack/react-query';

const useConfirmationCode = () => {
  const { mutateAsync, isLoading: isConfirmingCode, isSuccess, isError, reset, error } = useMutation(confirmCode);

  const confirm = async ({ email, code }: { email: string; code: string }) => {
    try {
      await mutateAsync({
        email,
        code,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    confirm,
    isConfirmingCode,
    isSuccess,
    isError,
    reset,
    error: error as ErrorDetail,
  };
};

export default useConfirmationCode;
