import { ApiResponse, IColumn, IColumnCreate, ListParams, ListResponse } from 'src/models';
import axiosKanban from './axiosKanban';

const prefix = '/columns';
const columnApi = {
  getAll(params: ListParams): Promise<ListResponse<IColumn>> {
    const url = `${prefix}`;
    return axiosKanban.get(url);
    // return axiosKanban.get(prefix, { params });
  },

  getById(id: string): Promise<ListResponse<IColumn>> {
    const url = `${prefix}/${id}`;
    return axiosKanban.get(url);
  },

  async add(data: IColumnCreate) {
    const response: ApiResponse<IColumn> = await axiosKanban.post(prefix, data);
    return new ApiResponse(response.status, response.message, response.data);
  },

  async update(data: Partial<IColumn>) {
    const url = `${prefix}/${data._id}`;
    const response: ApiResponse<IColumn> = await axiosKanban.put(url, data);
    return new ApiResponse(response.status, response.message, response.data);
  },

  remove(id: string | number | boolean): Promise<any> {
    const url = `${prefix}/${id}`;
    return axiosKanban.delete(url);
  },
};

export default columnApi;
