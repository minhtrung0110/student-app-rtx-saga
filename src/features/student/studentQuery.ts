import { useQuery } from '@tanstack/react-query';
import studentApi from '../../api/studentApi';

export function useGetDataStudent(params) {
  return useQuery({
    queryKey: ['students', params],
    queryFn: () => studentApi.getAll(params),
    cacheTime: 15 * 1000,
    staleTime: 10 * 1000,
  });
}
