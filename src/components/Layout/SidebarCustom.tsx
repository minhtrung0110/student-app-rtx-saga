import React, { FC } from 'react';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import styled from 'styled-components';
import { THEME } from '../../constants';
import { useLocation } from 'react-router-dom';

interface SidebarProps {
  collapsed: boolean;
  listNavItems: any;
}

const SidebarStyled = styled(Sider)`
  background-color: ${THEME?.token?.secondaryColor};
`;

const SidebarCustom: FC<SidebarProps> = ({ collapsed, listNavItems }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <SidebarStyled trigger={null} collapsible collapsed={collapsed} style={{ minHeight: 750 }}>
      <div className="demo-logo-vertical">Student-Project</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={listNavItems}
        selectedKeys={[currentPath]}
      />
    </SidebarStyled>
  );
};

export default SidebarCustom;
