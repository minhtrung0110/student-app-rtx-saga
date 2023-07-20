export interface IColumn {
  _id: string;
  title: string;
  project_id?: string | number | undefined;
  sort: number;
  status?: number;
}

export type IColumnCreate = Omit<IColumn, '_id'>;
export type IColumnUpdate = Omit<IColumn, '_id' | 'status' | 'sort'>;

export interface DataNewColumn {
  new_column: IColumnCreate;
  columns: IColumn[];
}
