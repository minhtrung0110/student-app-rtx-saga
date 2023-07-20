export interface IColumn {
  _id: string;
  title: string;
  project_id?: string | number | undefined;
  sort: number;
  status?: number;
}

export interface IColumnUpdate {
  _id: string;
  title?: string;
  project_id: string | number;
}

export type IColumnCreate = Omit<IColumn, '_id'>;

export interface DataNewColumn {
  new_column: IColumnCreate;
  columns: IColumn[];
}
