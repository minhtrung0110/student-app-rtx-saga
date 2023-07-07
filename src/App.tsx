import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { config } from './config';
import LoginPage from './features/auth/pages/LoginPage';
import { PrivateRoute } from './components/commoms';
import AdminLayout from './components/Layout/AdminLayout';
import ListStudentPage from './features/student/pages/ListStudentPage';
import Dashboard from './features/dashboard/pages/Dashboard';
import AddStudentPage from './features/student/pages/AddStudentPage';

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
          element={<AdminLayout slot={<AddStudentPage />} />}
        />
        <Route
          path={config.routes.update_student}
          element={<AdminLayout slot={<AddStudentPage />} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
