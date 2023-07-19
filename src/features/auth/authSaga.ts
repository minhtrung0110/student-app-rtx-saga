import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';
import { globalNavigate } from '../../components/commoms/GlobalHistory';
import { config } from '../../config';
import { getCookies, setCookies } from '../../api/authApi';

function* handleLogin(payload: LoginPayload) {
  console.log('handleLogin Saga', payload);
  try {
    yield delay(100);
    yield put(
      authActions.loginSuccess({
        id: 1,
        mail: 'Easy Frontend',
        password: '',
      }),
    );
    // redirect to admin page
    globalNavigate(config.routes.tasks);
  } catch (error) {
    yield put(authActions.loginFailed('failed to login'));
  }
}

function* handleLogout() {
  yield delay(500);
  setCookies('student-rtx', '', -1);
  // redirect to login page
  globalNavigate(config.routes.login);
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(getCookies('student-rtx'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
