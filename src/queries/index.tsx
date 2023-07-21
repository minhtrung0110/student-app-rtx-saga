// Query
import { useGetDataTasks } from './task';
import { useGetDataColumns } from './column';

export const useGetColumnTasks = () => {
  return {
    useGetColumns: useGetDataColumns(),
    useGetTasks: useGetDataTasks(),
  };
};
