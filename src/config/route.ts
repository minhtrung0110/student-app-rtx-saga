import { RouteConfig } from '../models';

const routes: RouteConfig = {
  home: '/',
  login: '/login',
  list_student: '/student',
  add_student: '/student/add',
  update_student: '/student/:studentId',
  delete_student: '/student/:studentId',
  tasks: '/tasks',
};

export default routes;
