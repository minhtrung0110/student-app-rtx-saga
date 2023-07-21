// Libraries
import { useQuery } from '@tanstack/react-query';

// Apis
import projectApi from 'src/api/projectApi';

// Constants
import { CACHE_TIME, PROJECT_ID, STALE_TIME } from 'src/constants/common';
import { AxiosError } from 'axios';

export const useGetProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => projectApi.getById(PROJECT_ID),
    cacheTime: CACHE_TIME * 2,
    staleTime: STALE_TIME * 2,
    onError: (error: AxiosError) => {},
  });
};
