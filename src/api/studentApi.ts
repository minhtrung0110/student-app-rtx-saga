import { ListParams, ListResponse, Student } from 'src/models';
import axiosClient from './axiosClient';

const studentApi = {
  getAll(params: ListParams): Promise<ListResponse<Student>> {
    const url = '/student';
    //console.log('call API', axiosClient.get(url, { params }));
    return axiosClient.get(url, { params });
  },

  getById(id: string): Promise<Student> {
    const url = `/student/${id}`;
    return axiosClient.get(url);
  },

  add(data: Student): Promise<Student> {
    const url = '/student';
    return axiosClient.post(url, data);
  },

  update(data: Partial<Student>): Promise<Student> {
    const url = `/student/${data.id}`;
    return axiosClient.put(url, data);
  },

  remove(id: string | number | boolean): Promise<any> {
    const url = `/student/${id}`;
    return axiosClient.delete(url);
  },
};

export default studentApi;
