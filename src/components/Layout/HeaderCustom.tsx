import React, { FC } from 'react';
import { THEME } from '../../constants';
import styled from 'styled-components';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import AvatarCustom from '../commoms/AvatarCustom';

interface HeaderProps {
  collapsed?: boolean;
  onCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
}

const HeaderStyled = styled(Header)`
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 4rem;
  background-color: ${THEME?.token?.white};
`;

interface MenuItemStyledProps {
  height: number;
  width: number;
  direction: string;
}

const MenuItemStyled = styled.div<MenuItemStyledProps>`
  width: ${props => props.width}rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: ${props => props.direction};
  align-content: center;
  height: ${props => props.height}rem;
  font-weight: bold;

  .icon {
    line-height: ${props => props.height}rem;
    font-weight: bold;
  }
`;

const HeaderCustom: FC<HeaderProps> = ({ collapsed, onCollapsed, onLogout }) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <MenuItemStyled height={4.5} width={7.5} direction={'column'}>
          <AvatarCustom avatar={'https://i.ibb.co/mvybfht/C-i-n-3-1.jpg'} lastName={'T'} />
          <span>N.D.Minh Trung</span>
        </MenuItemStyled>
      ),
    },
    {
      key: '2',
      label: (
        <MenuItemStyled height={1.5} width={7} direction={'row'} onClick={onLogout}>
          <LogoutOutlined className={'icon'} />
          <span>Sign out</span>
        </MenuItemStyled>
      ),
      danger: true,
    },
  ];
  return (
    <HeaderStyled>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => onCollapsed(!collapsed)}
      />
      <Dropdown menu={{ items }} trigger={['click']}>
        <Space>
          <AvatarCustom avatar={'https://i.ibb.co/mvybfht/C-i-n-3-1.jpg'} lastName={'Trung'} />
        </Space>
      </Dropdown>
    </HeaderStyled>
  );
};

export default HeaderCustom;
