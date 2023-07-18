import { UserTask } from './user_task';
import { Priority } from './priority';

// ICard& IList is used in hook useReducer . In the future, I will delete
export interface ICard {
  id: string;
  text: string;
  listId: string;
}

export interface IList {
  id: string;
  listTitle: string;
}

export interface Task {
  _id: string;
  project_id: string | number;
  column_id: string | number;
  assignee_user?: UserTask | [];
  report_user?: UserTask | [];
  title: string;
  description?: string;
  priority: Priority;
  estimate_point?: number;
  sort: number;
  status: number;
}

export interface TaskCreate extends Task {
  project_id: string;
  column_id: string | number;
  title: string;
  priority: Priority;
  sort: number;
  status: number;
}

export interface TaskDnd {
  _id: string;
  column_id: string | number;
  sort: number;
}

export interface DataDnd {
  dnd: TaskDnd;
  tasks: Task[];
  updated: Task[];
}

export interface DataNewTask {
  new_task: TaskCreate;
  tasks: Task[];
}
