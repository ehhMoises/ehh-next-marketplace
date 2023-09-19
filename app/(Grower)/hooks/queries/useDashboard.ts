import { DASHBOARD_QUERY_KEYS } from '@/constants/dashboard';
import { getDashboard } from '@/lib/api/dashboard';
import { useQuery } from '@tanstack/react-query';

const defaultOptions = {
  retry: false,
};

export const useGetDashboardQuery = (queryProps: any) =>
  useQuery([DASHBOARD_QUERY_KEYS.GET_DASHBOARD], () => getDashboard(), {
    ...defaultOptions,
    ...queryProps,
  });
