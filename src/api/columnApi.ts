import { ApiResponse, IColumn, IColumnCreate, ListResponse } from 'src/models';
import axiosKanban from './axiosKanban';

const prefix = '/columns';
const columnApi = {
  async getAll(params) {
    const response: ApiResponse<IColumn[]> = await axiosKanban.get(prefix);
    return new ApiResponse(response.status, response.message, response.data);
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
