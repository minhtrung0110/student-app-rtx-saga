import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ListStudentPage from 'src/features/student/pages/ListStudentPage';
import { config } from 'src/config';
import LoginPage from 'src/features/auth/pages/LoginPage';
import { PrivateRoute } from 'src/components/commoms';
import AdminLayout from 'src/components/Layout/AdminLayout';

function App() {
  return (
    <Routes>
      <Route path={config.routes.login} element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route
          path={config.routes.list_students}
          element={<AdminLayout slot={<ListStudentPage />} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
