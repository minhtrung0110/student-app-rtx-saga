import { RouteConfig } from '../models';

const routes: RouteConfig = {
  login: '/login',
  list_student: '/student',
  add_student: '/student/add',
  update_student: '/student/:studentId',
  delete_student: '/student/:studentId',
  tasks: '/',
  react_table: '/react-table',
};
export default routes;
