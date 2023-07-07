import counterSaga from '../features/counter/couterSaga';
import { all } from 'redux-saga/effects';
import authSaga from 'src/features/auth/authSaga';
import studentSaga from '../features/student/studentSaga';

export default function* rootSaga() {
  console.log('Root Saga');
  yield all([counterSaga(), authSaga(), studentSaga()]);
}
