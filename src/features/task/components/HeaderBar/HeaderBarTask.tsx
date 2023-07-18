// Libraries
import React, { FC } from 'react';
import { AppstoreOutlined } from '@ant-design/icons';

// Styles
import { HeaderBarStyled } from './HeaderBarTask.styles';

interface HeaderBarTaskProps {
  // Các prop và kiểu dữ liệu tương ứng
}

const HeaderBarTask: FC<HeaderBarTaskProps> = (
  {
    /* props */
  },
) => {
  return (
    <HeaderBarStyled className="navbar-app">
      <div className="list-task">
        <AppstoreOutlined className="icon" />
        <span className="text">List Tasks To Do</span>
      </div>
    </HeaderBarStyled>
  );
};

export default HeaderBarTask;
