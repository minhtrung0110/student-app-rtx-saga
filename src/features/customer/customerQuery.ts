// Libraries
import { useQuery } from '@tanstack/react-query';

// Api
import customerApi from '../../api/customerApi';

export function useCustomerQueries(params) {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => customerApi.getAll(params),
    cacheTime: 15 * 1000,
    staleTime: 10 * 1000,
  });
}
