import React, { FC, ReactNode, useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { NavLink } from 'react-router-dom';
import { config } from 'src/config';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SolutionOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Content, Header } from 'antd/es/layout/layout';

interface AdminLayoutProps {
  slot: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ slot }) => {
  const [collapsed, setCollapsed] = useState(false);

  function getItem(label: ReactNode, key: string, icon: ReactNode) {
    return {
      key,
      icon,
      label,
    };
  }

  const listNavItems = [
    getItem(
      <NavLink to={config.routes.list_students}>Học Viên</NavLink>,
      config.routes.list_students,
      <UnorderedListOutlined />,
    ),
    getItem(
      <NavLink to={config.routes.tasks}>Công Viêc</NavLink>,
      config.routes.tasks,
      <SolutionOutlined />,
    ),
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ minHeight: 750 }}>
        <div className="demo-logo-vertical">Student-Project</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={listNavItems} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 60,
              height: 60,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {slot}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
