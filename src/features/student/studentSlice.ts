// Libraries
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Store
import { RootState } from 'src/app/store';

// Models
import { ListParams, PaginationParams, Student, StudentType } from 'src/models';

export interface StudentState {
  loading: boolean;
  list: Student[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: StudentState = {
  loading: false,
  list: [],
  filter: {
    // _page: 1,
    // _limit: 5,
  },
  pagination: {
    _page: 1,
    _limit: 5,
    _totalRows: 15,
  },
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchStudentListFailed(state) {
      state.loading = false;
    },

    fetchStudentListSuccess(state, action: PayloadAction<Student[]>) {
      state.list = action.payload;
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },

    addStudent(state, action: PayloadAction<StudentType>) {},
    updateStudent(state, action: PayloadAction<Student>) {},
    removeStudent(state, action: PayloadAction<string | number | boolean>) {},

    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

// Actions
export const studentActions = studentSlice.actions;

// Selectors
export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) => state.student.pagination;

// Reducer
const studentReducer = studentSlice.reducer;
export default studentReducer;
