// Models
import { ListResponse, Student, StudentType } from 'src/models';

// Api
import axiosClient from './axiosClient';

const prefix = '/student';
const studentApi = {
  getAll(params): Promise<ListResponse<Student>> {
    return axiosClient.get(prefix, { params });
  },

  getById(id: string): Promise<Student> {
    const url = `${prefix}/${id}`;
    return axiosClient.get(url);
  },

  add(data: StudentType): Promise<Student> {
    return axiosClient.post(prefix, data);
  },

  update(data: Partial<Student>): Promise<Student> {
    const url = `${prefix}/${data.id}`;
    return axiosClient.put(url, data);
  },

  remove(id: string | number | boolean): Promise<any> {
    const url = `${prefix}/${id}`;
    return axiosClient.delete(url);
  },
};

export default studentApi;
