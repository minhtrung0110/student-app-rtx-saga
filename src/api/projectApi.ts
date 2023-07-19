import { ListParams, ListResponse, Project, ProjectTask } from 'src/models';
import axiosKanban from './axiosKanban';

const prefix = '/projects';
const projectApi = {
  getAll(params: ListParams): Promise<ListResponse<Project>> {
    const url = `${prefix}/64ad374466cc6c557758eb9c`;
    return axiosKanban.get(url);
    // return axiosKanban.get(prefix, { params });
  },

  getById(id: string): Promise<ListResponse<ProjectTask>> {
    const url = `${prefix}/${id}`;
    return axiosKanban.get(url);
  },

  add(data: Project): Promise<Project> {
    return axiosKanban.post(prefix, data);
  },

  update(data: Partial<Project>): Promise<Project> {
    const url = `${prefix}/${data._id}`;
    return axiosKanban.put(url, data);
  },

  remove(id: string | number | boolean): Promise<any> {
    const url = `${prefix}/${id}`;
    return axiosKanban.delete(url);
  },
};

export default projectApi;
