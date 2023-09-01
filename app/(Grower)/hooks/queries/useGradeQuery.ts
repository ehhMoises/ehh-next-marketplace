import { GRADE_QUERY_KEYS } from '@/constants/grade';
import { getGradeById, getGrades } from '@/lib/api/grade';
import { useQuery } from '@tanstack/react-query';

const defaultOptions = {
  retry: false,
};

// Get all Brands
export const useGetGradeQuery = (queryProps: any) =>
  useQuery([GRADE_QUERY_KEYS.GET_GRADES], () => getGrades({}), {
    ...defaultOptions,
    ...queryProps,
  });

  export const useGetGradeByIdQuery = (id: string, queryProps: any) =>
  useQuery([GRADE_QUERY_KEYS.GET_GRADE_BY_ID, id], () => getGradeById(id), {
    ...defaultOptions,
    ...queryProps,
  });