import { queryClient } from '@/app/provider';
import { GRADE_QUERY_KEYS } from '@/constants/grade';
import { addGrade, updateGrade } from '@/lib/api/grade';
import { useMutation } from '@tanstack/react-query';

export const useCreateGradeMutation = () =>
  useMutation({
    mutationFn: addGrade,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GRADE_QUERY_KEYS.GET_GRADES],
      });
    },
  });

export const useUpdateGradeMutation = () =>
  useMutation({
    mutationFn: updateGrade,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GRADE_QUERY_KEYS.GET_GRADES],
      });
      queryClient.invalidateQueries({
        queryKey: [GRADE_QUERY_KEYS.GET_GRADE_BY_ID],
      });
    },
  });
