import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { config } from './config';
import LoginPage from './features/auth/pages/LoginPage';
import { PrivateRoute } from './components/commoms';
import AdminLayout from './components/Layout/AdminLayout';
import ListStudentPage from './features/student/pages/ListStudentPage';
import Dashboard from './features/dashboard/pages/Dashboard';
import FormStudentPage from './features/student/pages/FormStudentPage';
import ManageTaskPage from './features/task/pages/ManageTaskPage';

function App() {
  return (
    <Routes>
      <Route path={config.routes.login} element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route path={config.routes.home} element={<AdminLayout slot={<Dashboard />} />} />
        <Route
          path={config.routes.list_student}
          element={<AdminLayout slot={<ListStudentPage />} />}
        />
        <Route
          path={config.routes.add_student}
          element={<AdminLayout slot={<FormStudentPage />} />}
        />
        <Route
          path={config.routes.update_student}
          element={<AdminLayout slot={<FormStudentPage />} />}
        />
        <Route path={config.routes.tasks} element={<AdminLayout slot={<ManageTaskPage />} />} />
      </Route>
    </Routes>
  );
}

export default App;
