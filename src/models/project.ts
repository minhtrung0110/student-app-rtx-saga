import { UserTask } from './user_task';
import { IColumn } from './column';
import { Task } from './task';

export interface Project {
  _id: string | number;
  name: string;
  description: string;
  status: number;
  created_by: UserTask | string;
}

export interface ProjectTask {
  _id: string | number;
  name: string;
  description: string;
  status: number;
  board_columns: IColumn[];
  tasks: Task[];
  created_by?: UserTask | string;
}
