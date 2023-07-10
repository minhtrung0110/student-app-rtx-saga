import React, { FC } from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { THEME } from '../../../../constants';

interface HeaderBarTaskProps {
  // Các prop và kiểu dữ liệu tương ứng
}

const HeaderBarStyled = styled.div`
  height: 3.5rem;
  padding-left: calc(2 * 10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  // background-color:var(--appbar-bg-color) ;
  font-size: 1rem;

  .list-task {
    border-radius: ${THEME?.token?.borderRadius};
    border: hsla(0deg, 0%, 100%, 0.34);
    height: 2.2rem;
    padding: 0 0.8rem;
    display: flex;
    align-items: center;
    background-color: ${THEME?.token?.light};
    color: ${THEME?.token?.primaryColor};

    .icon {
      font-size: 1rem;
      margin-right: 0.5rem;
    }

    .text {
      font-size: 0.75rem;
      font-weight: 600;
    }
  }
`;
const HeaderBarTask: FC<HeaderBarTaskProps> = (
  {
    /* props */
  },
) => {
  return (
    <HeaderBarStyled className="navbar-app">
      <div className="list-task">
        <AppstoreOutlined className="icon" />
        <span className="text">Danh Sách Công Việc</span>
      </div>
    </HeaderBarStyled>
  );
};

export default HeaderBarTask;
