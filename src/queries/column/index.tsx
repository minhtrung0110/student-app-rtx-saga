// Libraries
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// Models
import { IColumn, IColumnCreate, TNotification } from 'src/models';

// Apis
import columnApi from 'src/api/columnApi';

// Constants
import { queryClient } from 'src/index';
import { CACHE_TIME, STALE_TIME } from 'src/constants/common';

// Action - Hook
import { useAppDispatch } from 'src/app/hooks';
import { projectActions } from 'src/features/task/projectSlice';

const handleGetListColumns = async () => {
  const result = await columnApi.getAll('');
  if (result.status === 200) return result.data;
};

export const useCreateColumn = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (body: IColumnCreate) => {
      return columnApi.add(body);
    },
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['columns'], exact: true });
    },
    onError: (err: AxiosError) => {
      const noti: TNotification = {
        type: 'error',
        message: 'Create Column Fail',
        description: err.message,
        duration: 1.4,
        init: false,
      };
      dispatch(projectActions.fetchNotification(noti));
    },
  });
};

export const useUpdateColumn = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (body: IColumn) => {
      return columnApi.update(body);
    },
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: ['columns'], exact: true });
    },
    onError: (err: AxiosError) => {
      const noti: TNotification = {
        type: 'error',
        message: 'Update Column Fail',
        description: err.message,
        duration: 1.4,
        init: false,
      };
      dispatch(projectActions.fetchNotification(noti));
    },
  });
};

export const useDeleteColumn = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (id: string) => {
      return columnApi.remove(id);
    },
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['columns'], exact: true });
    },
    onError: (err: AxiosError) => {
      const noti: TNotification = {
        type: 'error',
        message: 'Update Column Fail',
        description: err.message,
        duration: 1.4,
        init: false,
      };
      dispatch(projectActions.fetchNotification(noti));
    },
  });
};

export const useGetDataColumns = () => {
  return useQuery({
    queryKey: ['columns'],
    queryFn: () => handleGetListColumns(),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
};
