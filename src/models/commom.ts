import { ReactNode } from 'react';

export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

// export interface ListResponse<T> {
//   data: T[];
//   pagination: PaginationParams;
// }

export interface ListParams {
  // _page?: number;
  //_limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';

  [key: string]: any;
}

export interface RouteConfig {
  home: string;
  login: string;
  list_student: string;
  add_student: string;
  update_student: string;
  delete_student: string;
  tasks: string;
}

export interface Config {
  routes: RouteConfig;
}

export interface DataTableStudentType {
  avatar: ReactNode;
  full_name: string;
  contact: ReactNode;
  address: string;
  status: ReactNode;
}
