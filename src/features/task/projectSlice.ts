// Libraries
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Store Actions
import { RootState } from 'src/app/store';

// Models
import {
  DataDnd,
  DataNewTask,
  IColumn,
  IColumnCreate,
  IColumnUpdate,
  ListParams,
  ProjectTask,
  Task,
} from 'src/models';

export interface ProjectState {
  loading: boolean;
  project: ProjectTask | null;
  columns: IColumn[];
  tasks: Task[];
  filter: ListParams;
  errors: string;
}

const initialState: ProjectState = {
  loading: false,
  project: null,
  columns: [],
  tasks: [],
  filter: [],
  errors: '',
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    fetchError(state, action: PayloadAction<string>) {
      state.errors = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
    fetchProjectData(state, action: PayloadAction<ProjectTask>) {
      state.loading = true;
      state.project = action.payload;
      state.columns = action.payload.board_columns;
      state.tasks = action.payload.tasks;
      state.loading = false;
    },

    fetchListColumnsChange(state, action: PayloadAction<IColumn[]>) {
      state.loading = true;
      state.columns = action.payload;
      state.loading = false;
    },

    fetchListTasksChange(state, action: PayloadAction<Task[]>) {
      state.loading = true;
      state.tasks = action.payload;
      state.loading = false;
    },

    fetchProjectList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
      state.filter = { _project_id: 'a43fn5ah' };
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    // Column
    addColumn(state, action: PayloadAction<IColumnCreate>) {
      state.loading = true;
    },
    updateColumn(state, action: PayloadAction<IColumnUpdate>) {
      state.loading = true;
    },
    deleteColumn(state, action: PayloadAction<IColumnUpdate>) {
      state.loading = true;
    },

    // Task
    addTask(state, action: PayloadAction<DataNewTask>) {
      state.loading = true;
    },
    updateTask(state, action: PayloadAction<Task>) {
      state.loading = true;
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchTaskDragAndDrop(state, action: PayloadAction<DataDnd>) {},
  },
});

// Actions
export const projectActions = projectSlice.actions;

// Selectors
export const selectProject = (state: RootState) => state.project.project;
export const selectColumnList = (state: RootState) => state.project.columns;
export const selectTaskList = (state: RootState) => state.project.tasks;
export const selectProjectLoading = (state: RootState) => state.project.loading;
export const selectProjectError = (state: RootState) => state.project.errors;
export const selectProjectFilter = (state: RootState) => state.project.filter;

// Reducer
const projectReducer = projectSlice.reducer;
export default projectReducer;
