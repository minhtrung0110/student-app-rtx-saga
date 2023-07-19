import React, { FC, ReactNode, useState } from 'react';
import { Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import { config } from 'src/config';
import { SolutionOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import { THEME } from '../../constants';
import { useAppDispatch } from '../../app/hooks';
import { authActions } from '../../features/auth/authSlice';
import HeaderCustom from './HeaderCustom';
import SidebarCustom from './SidebarCustom';

interface AdminLayoutProps {
  slot: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ slot }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  function getItem(label: ReactNode, key: string, icon: ReactNode) {
    return {
      key,
      icon,
      label,
    };
  }

  const listNavItems = [
    getItem(
      <NavLink to={config.routes.tasks}>Công Viêc</NavLink>,
      config.routes.tasks,
      <SolutionOutlined />,
    ),
    getItem(
      <NavLink to={config.routes.list_student}>Học Viên</NavLink>,
      config.routes.list_student,
      <UnorderedListOutlined />,
    ),
  ];

  const backgroundColor = THEME?.token?.backgroundColor;
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <Layout>
      <SidebarCustom collapsed={collapsed} listNavItems={listNavItems} />
      <Layout>
        <HeaderCustom collapsed={collapsed} onCollapsed={setCollapsed} onLogout={handleLogout} />
        <Content
          style={{
            margin: '5px',
            padding: 5,
            minHeight: 280,
            background: backgroundColor,
          }}
        >
          {slot}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
