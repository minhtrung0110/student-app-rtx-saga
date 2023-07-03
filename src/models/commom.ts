export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';

  [key: string]: any;
}

export interface RouteConfig {
  home: string;
  login: string;
  list_students: string;
}

export interface Config {
  routes: RouteConfig;
}

export interface DataTableStudentType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
