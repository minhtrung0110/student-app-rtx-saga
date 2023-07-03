import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ListStudentPage from './features/student/pages/ListStudentPage';
import { config } from './config';

function App() {
  return (
    <Routes>
      <Route path={config.routes.list_students} element={<ListStudentPage />} />
    </Routes>
  );
}

export default App;
