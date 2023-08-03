// Models
import { ListResponse, Student, StudentType } from 'src/models';

// Api
import axiosClient from './axiosClient';
import { isEmpty } from 'lodash';

const prefix = '/customer';
const customerApi = {
  getAll(params): Promise<ListResponse<Student>> {
    const url = isEmpty(params) ? prefix : `${prefix}/?search=${params}`;
    return axiosClient.get(url);
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

export default customerApi;
