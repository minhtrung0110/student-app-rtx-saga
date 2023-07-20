import { ApiResponse, ListResponse, Task, TaskCreate, TaskDnd } from 'src/models';
import axiosKanban from './axiosKanban';

const prefix = '/tasks';
const taskApi = {
  async getAll(params: any) {
    const response: ApiResponse<Task[]> = await axiosKanban.get(prefix);
    return new ApiResponse(response.status, response.message, response.data);
  },

  getById(id: string): Promise<ListResponse<Task>> {
    const url = `${prefix}/${id}`;
    return axiosKanban.get(url);
  },

  async add(data: TaskCreate) {
    const response: ApiResponse<Task> = await axiosKanban.post(prefix, data);
    return new ApiResponse(response.status, response.message, response.data);
  },

  dnd(data: Partial<TaskDnd>): Promise<Task> {
    const url = `${prefix}/${data._id}`;
    return axiosKanban.put(url, data);
  },
  async updateTasks(data: Task[]) {
    const url = `${prefix}/updateMany`;
    const response: ApiResponse<Task> = await axiosKanban.patch(url, data);
    return new ApiResponse(response.status, response.message, response.data);
  },
  update(data: Partial<Task>): Promise<Task> {
    const url = `${prefix}/${data._id}`;
    return axiosKanban.put(url, data);
  },

  remove(id: string | number | boolean): Promise<any> {
    const url = `${prefix}/${id}`;
    return axiosKanban.delete(url);
  },
};

export default taskApi;
