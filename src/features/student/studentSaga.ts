// Libraries
import { PayloadAction } from '@reduxjs/toolkit';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';

// Api
import studentApi from 'src/api/studentApi';

// Models
import { ListParams, Student, StudentType } from 'src/models';

// Actions
import { studentActions } from './studentSlice';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: Student[] = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(studentActions.fetchStudentListFailed());
  }
}

function* addStudent(action: PayloadAction<StudentType>) {
  try {
    yield call(studentApi.add, action.payload);
    const response: Student[] = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(studentActions.fetchStudentListFailed());
  }
}

function* updateStudent(action: PayloadAction<Student>) {
  try {
    yield call(studentApi.update, action.payload);
    const response: Student[] = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(studentActions.fetchStudentListFailed());
  }
}

function* removeStudent(action: PayloadAction<string | number | boolean>) {
  try {
    yield call(studentApi.remove, action.payload);
    const response: Student[] = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(studentActions.fetchStudentListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList, fetchStudentList);
  yield takeLatest(studentActions.addStudent, addStudent);
  yield takeLatest(studentActions.updateStudent, updateStudent);
  yield takeLatest(studentActions.removeStudent, removeStudent);
  yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchDebounce);
}
