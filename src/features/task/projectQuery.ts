// Libraries
import { useQuery } from '@tanstack/react-query';

// Apis
import columnApi from 'src/api/columnApi';
import taskApi from 'src/api/taskApi';

export function useDataQueries() {
  const handleGetListColumns = async () => {
    const result = await columnApi.getAll('');
    if (result.status === 200) return result.data;
  };

  const handleGetListTasks = async () => {
    const result = await taskApi.getAll('');
    if (result.status === 200) return result.data;
  };

  const queryColumns = useQuery({
    queryKey: ['columns'],
    queryFn: () => handleGetListColumns(),
    cacheTime: 15 * 1000,
    staleTime: 10 * 1000,
  });

  const queryTasks = useQuery({
    queryKey: ['tasks'],
    queryFn: () => handleGetListTasks(),
    cacheTime: 15 * 1000,
    staleTime: 10 * 1000,
  });

  return {
    queryColumns,
    queryTasks,
  };
}
