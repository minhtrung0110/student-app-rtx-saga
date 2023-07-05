import * as React from 'react';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { config } from 'src/config';
import { getCookies } from 'src/api/authApi';

export const PrivateRoute: FC = () => {
  const isLoggedIn = Boolean(getCookies('student-rtx'));
  console.log('Check Login:', isLoggedIn);
  if (!isLoggedIn) return <Navigate to={config.routes.login} />;

  return isLoggedIn ? <Outlet /> : <Navigate to={config.routes.login} />;
};

export default PrivateRoute;
