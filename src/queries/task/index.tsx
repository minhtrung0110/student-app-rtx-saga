// Libraries
import { Updater, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// Constants
import { CACHE_TIME, STALE_TIME } from 'src/constants/common';
import { queryClient } from 'src/index';

// Apis
import taskApi from 'src/api/taskApi';

// Models
import { DataDnd, Task, TNotification } from 'src/models';

// Action - Hook
import { useAppDispatch } from 'src/app/hooks';
import { projectActions } from 'src/features/task/projectSlice';

const handleGetListTasks = async () => {
  const result = await taskApi.getAll('');
  if (result.status === 200) return result.data;
};

export const useGetDataTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => handleGetListTasks(),
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
};
export const useCreateTask = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (body: Task) => {
      return taskApi.add(body);
    },
    // When mutate is called:
    onMutate: async newTodo => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(['tasks']);

      // Optimistically update to the new value
      const updateTasks: Updater<Task[], any> = old => [...(old || []), newTodo];
      queryClient.setQueryData(['tasks'], a => updateTasks(a));

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err: AxiosError, newTodo, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTodos);
      const noti: TNotification = {
        type: 'error',
        message: 'Create Task Fail',
        description: err.message,
        duration: 1.4,
        init: false,
      };
      dispatch(projectActions.fetchNotification(noti));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
export const useUpdateTask = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (body: Task) => {
      return taskApi.update(body);
    },
    onMutate: async newTodo => {
      await queryClient.cancelQueries({ queryKey: ['tasks', newTodo._id] });
      const previousTodo = queryClient.getQueryData(['tasks', newTodo._id]);
      queryClient.setQueryData(['tasks', newTodo._id], newTodo);
      return { previousTodo, newTodo };
    },
    onError: (err: AxiosError, newTodo, context) => {
      queryClient.setQueryData(['tasks', context?.newTodo._id], context?.previousTodo);
      const noti: TNotification = {
        type: 'error',
        message: 'Update Task Fail',
        description: err.message,
        duration: 1.4,
        init: false,
      };
      dispatch(projectActions.fetchNotification(noti));
    },
    onSettled: res => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (_id: string) => {
      return taskApi.remove(_id);
    },
    onMutate: async _id => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTodos = queryClient.getQueryData(['tasks']);
      const deletedTasks: Updater<Task[], any> = old => old.filter(todo => todo._id !== _id);
      queryClient.setQueryData(['tasks'], a => deletedTasks(a));
      return { previousTodos };
    },
    onError: (err: AxiosError, task, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTodos);
      const noti: TNotification = {
        type: 'error',
        message: 'Delete Task Fail',
        description: err.message,
        duration: 1.4,
        init: false,
      };
      dispatch(projectActions.fetchNotification(noti));
    },
    onSettled: res => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
export const useDragAndDrop = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (body: DataDnd) => {
      return taskApi.updateTasks(body.updated);
    },
    onMutate: async data => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      //const previousTodo = queryClient.getQueryData(['tasks', data._id]);
      queryClient.setQueryData(['tasks'], data.tasks);
      return data.old_tasks;
    },
    onError: (err: AxiosError, data, context) => {
      queryClient.setQueryData(['tasks'], data.old_tasks);
      const noti: TNotification = {
        type: 'error',
        message: 'Drag And Drop Task Fail',
        description: err.message,
        duration: 1.4,
        init: false,
      };
      dispatch(projectActions.fetchNotification(noti));
    },
    onSettled: res => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
