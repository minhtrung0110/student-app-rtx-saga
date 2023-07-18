// Libraries
import { PayloadAction } from '@reduxjs/toolkit';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';

// Models
import {
  ApiResponse,
  DataDnd,
  DataNewTask,
  IColumnCreate,
  IColumnUpdate,
  ListParams,
  ProjectTask,
  Task,
} from 'src/models';

// Actions
import { projectActions } from './projectSlice';

// API
import taskApi from 'src/api/taskApi';
import columnApi from 'src/api/columnApi';
import projectApi from 'src/api/projectApi';

// Project
function* fetchProjectData(action: PayloadAction<ListParams>) {
  try {
    const response: ApiResponse<ProjectTask> = yield call(projectApi.getAll, action.payload);
    yield put(projectActions.fetchProjectData(response.data[0]));
  } catch (error) {
    yield put(projectActions.fetchError('Get Data Project Failed'));
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(projectActions.setFilter(action.payload));
}

// Column
function* createColumn(action: PayloadAction<IColumnCreate>) {
  try {
    // Gọi API cập nhật dữ liệu
    const response = yield call(columnApi.add, action.payload);

    if (response.status === 200)
      // Gửi action thành công
      yield put(projectActions.fetchListColumnsChange(response.data));
  } catch (error) {
    // yield put(updateDataFailure(error)); // Gửi action lỗi
  }
}

function* updateColumn(action: PayloadAction<IColumnUpdate>) {
  try {
    // Gọi API cập nhật dữ liệu
    const response = yield call(columnApi.update, action.payload);
    if (response.status === 200)
      // Gửi action thành công
      yield put(projectActions.fetchListColumnsChange(response.data));
  } catch (error) {
    // yield put(updateDataFailure(error)); // Gửi action lỗi
  }
}

function* deleteColumn(action: PayloadAction<IColumnUpdate>) {
  try {
    // Gọi API xóa dữ liệu
    const response = yield call(columnApi.remove, action.payload._id);

    if (response.status === 200)
      // Gửi action thành công
      yield put(projectActions.fetchListColumnsChange(response.data));
  } catch (error) {
    // yield put(updateDataFailure(error)); // Gửi action lỗi
  }
}

// Task
function* fetchTaskDragAndDrop(action: PayloadAction<DataDnd>) {
  try {
    yield put(projectActions.fetchListTasksChange(action.payload.tasks));
    const response = yield call(taskApi.updateTasks, action.payload.updated);
    if (response.status !== 200) {
      yield put(projectActions.fetchError('Drag And Drop Task Fail'));

      const result = yield call(taskApi.getAll, action.payload);
      yield put(projectActions.fetchListTasksChange(result.data));
    }
  } catch (error) {
    console.log('Failed DND', error);
    // yield put(projectActions.fetchTaskListFailed());
  }
}

function* createTask(action: PayloadAction<DataNewTask>) {
  try {
    // call api create task
    const response = yield call(taskApi.add, action.payload.new_task);

    if (response.status === 200) {
      const newListTasks = [...action.payload.tasks, response.data];
      // add tasks to global state
      yield put(projectActions.fetchListTasksChange(newListTasks));
    } // notify if has error
    else yield put(projectActions.fetchError('Create Task Fail'));

    // call api get all tasks instance
    const result = yield call(taskApi.getAll, action.payload);

    // set list tasks instance to global state
    yield put(projectActions.fetchListTasksChange(result.data));
  } catch (error) {
    //yield put(projectActions.fetchError(error.message())); // Gửi action lỗi
  }
}

function* updateTask(action: PayloadAction<Task>) {
  try {
    // Gọi API cập nhật dữ liệu
    const response = yield call(taskApi.update, action.payload);
    if (response.status !== 200) yield put(projectActions.fetchError('Update Task Fail'));
    console.log(response);

    // call api get all tasks instance
    const result = yield call(taskApi.getAll, action.payload);
    // set list tasks instance to global state
    yield put(projectActions.fetchListTasksChange(result.data));
  } catch (error) {
    // yield put(updateDataFailure(error)); // Gửi action lỗi
  }
}

function* deleteTask(action: PayloadAction<string>) {
  try {
    // Gọi API xóa dữ liệu
    const response = yield call(taskApi.remove, action.payload);
    if (response.status !== 200) yield put(projectActions.fetchError('Delete Task Fail'));
    // call api get all tasks instance
    const result = yield call(taskApi.getAll, action.payload);
    // set list tasks instance to global state
    yield put(projectActions.fetchListTasksChange(result.data));
  } catch (error) {
    // yield put(updateDataFailure(error)); // Gửi action lỗi
  }
}

export default function* projectSaga() {
  // Project
  yield takeLatest(projectActions.fetchProjectList, fetchProjectData);
  yield takeLatest(projectActions.fetchTaskDragAndDrop, fetchTaskDragAndDrop);
  yield debounce(700, projectActions.setFilterWithDebounce.type, handleSearchDebounce);

  // Column
  yield takeLatest(projectActions.addColumn, createColumn);
  yield takeLatest(projectActions.updateColumn, updateColumn);
  yield takeLatest(projectActions.deleteColumn, deleteColumn);

  // Task
  yield takeLatest(projectActions.addTask, createTask);
  yield takeLatest(projectActions.updateTask, updateTask);
  yield takeLatest(projectActions.deleteTask, deleteTask);
}
