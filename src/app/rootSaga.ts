import { all } from 'redux-saga/effects';
import authSaga from 'src/features/auth/authSaga';
import studentSaga from '../features/student/studentSaga';
import projectSaga from '../features/task/projectSaga';

export default function* rootSaga() {
  yield all([projectSaga(), authSaga(), studentSaga()]);
}
