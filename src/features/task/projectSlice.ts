// Libraries
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Store Actions
import { RootState } from 'src/app/store';

// Models
import { Task, TNotification } from 'src/models';

export interface ProjectState {
  loading: boolean;
  notification: TNotification;
  error: string;
  warning: string;
  currentTask: Task | undefined;
  action: {
    isShowDetail: boolean;
  };
}

const initialState: ProjectState = {
  loading: false,
  notification: {
    type: 'info',
    message: '',
    description: '',
    init: true,
  },
  error: '',
  warning: '',
  currentTask: undefined,
  action: {
    isShowDetail: false,
  },
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    fetchErrorMessage(state, action: PayloadAction<string>) {
      state.warning = action.payload;
    },
    fetchErrorType(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    fetchLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    fetchNotification(state, action: PayloadAction<TNotification>) {
      state.notification = action.payload;
    },
    fetchCurrentTask(state, action: PayloadAction<Task>) {
      state.currentTask = action.payload;
    },
    fetchActionShowTask(state, action: PayloadAction<boolean>) {
      state.action.isShowDetail = action.payload;
    },
  },
});

// Actions
export const projectActions = projectSlice.actions;

// Selectors
export const selectErrorType = (state: RootState) => state.project.error;
export const selectErrorMessage = (state: RootState) => state.project.warning;
export const selectLoading = (state: RootState) => state.project.loading;
export const selectNotification = (state: RootState) => state.project.notification;
export const selectCurrentTask = (state: RootState) => state.project.currentTask;
export const selectStateShowTask = (state: RootState) => state.project.action.isShowDetail;

// Reducer
const projectReducer = projectSlice.reducer;
export default projectReducer;
