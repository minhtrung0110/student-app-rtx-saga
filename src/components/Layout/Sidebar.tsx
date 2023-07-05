import React, { FC, ReactNode, useState } from 'react';
import { Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { NavLink } from 'react-router-dom';
import { config } from '../../config';
import { UnorderedListOutlined } from '@ant-design/icons';

interface SidebarProps {
  // Các prop và kiểu dữ liệu tương ứng
}

const Sidebar: FC<SidebarProps> = (
  {
    /* props */
  },
) => {
  const [collapsed, setCollapsed] = useState(false);

  function getItem(label: ReactNode, key: string, icon: ReactNode, children: ReactNode[] = []) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const listNavItems = [
    getItem(
      <NavLink to={config.routes.list_students}>Học Viên</NavLink>,
      config.routes.list_students,
      <UnorderedListOutlined />,
    ),
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={listNavItems} />
    </Sider>
  );
};

export default Sidebar;
