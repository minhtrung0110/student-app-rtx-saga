// Libraries
import { useQuery } from '@tanstack/react-query';

// Api
import customerApi from '../../api/customerApi';

export function useCustomerQueries() {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => customerApi.getAll(''),
    cacheTime: 15 * 1000,
    staleTime: 10 * 1000,
  });
}
