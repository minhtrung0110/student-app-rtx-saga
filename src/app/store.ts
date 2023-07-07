import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import authReducer from 'src/features/auth/authSlice';
import studentReducer from 'src/features/student/studentSlice';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    student: studentReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
