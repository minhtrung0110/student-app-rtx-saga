import { ReactNode } from 'react';

export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
}

// export interface ListResponse<T> {
//   data: T[];
//   pagination: PaginationParams;
// }

export interface ListParams {
  // _page?: number;
  //_limit?: number;
  _type?: string;
  _sort?: string;
  _order?: 'asc' | 'desc';

  [key: string]: any;
}

export interface RouteConfig {
  login: string;
  list_student: string;
  add_student: string;
  update_student: string;
  delete_student: string;
  tasks: string;
  react_table: string;
}

export interface ServerUrl {
  [key: string]: string;
}

export interface Config {
  routes: RouteConfig;
  servers: ServerUrl;
}

export interface DataTableStudentType {
  avatar: ReactNode;
  full_name: string;
  contact: ReactNode;
  address: string;
  status: ReactNode;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export class ApiResponse<T> {
  status: number;
  message: string;
  data: T;

  constructor(statusCode: number, message: string, data: T) {
    this.status = statusCode;
    this.message = message;
    this.data = data;
  }
}

export interface TNotification {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  description: string;
  duration?: number;
  init: boolean;
}
