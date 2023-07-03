import { ListParams, ListResponse, Student } from 'src/models';
import axiosClient from './axiosClient';

const studentApi = {
  getAll(params: ListParams): Promise<ListResponse<Student>> {
    const url = '/student';
    return axiosClient.get(url, { params });
  },

  getById(id: string): Promise<Student> {
    const url = `/student/${id}`;
    return axiosClient.get(url);
  },

  add(data: Student): Promise<Student> {
    const url = '/students';
    return axiosClient.post(url, data);
  },

  update(data: Partial<Student>): Promise<Student> {
    const url = `/student/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: string): Promise<any> {
    const url = `/student/${id}`;
    return axiosClient.delete(url);
  },
};

export default studentApi;
