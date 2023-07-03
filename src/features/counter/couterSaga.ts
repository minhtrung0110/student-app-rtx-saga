import { delay, put, takeEvery } from 'redux-saga/effects';
import { incrementSaga, incrementSagaSuccess } from './counterSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('Waiting 2s');
  // Waiting 2s
  yield delay(2000);
  console.log('Waiting done,dispatch action');
  // Dispacth Action
  yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga() {
  console.log('Counter Saga');
  yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
  //yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}
