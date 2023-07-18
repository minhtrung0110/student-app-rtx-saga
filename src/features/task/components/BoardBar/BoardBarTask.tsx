// Libraries
import React, { FC } from 'react';
import { DeleteOutlined, EllipsisOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

// Styles
import { NavbarBoardStyled } from './BoardBar.styles';

interface BoardBarTaskProps {
  name: string;
}

const BoardBarTask: FC<BoardBarTaskProps> = ({ name }) => {
  const listActionProjects = [
    {
      label: 'Xóa Chu Kỳ Phát Triển',
      key: '1',
      icon: <DeleteOutlined />,
    },
  ];
  const handleChooseActionProject = ({ key }) => {
    if (key === '2') {
    } else if (key === '1') {
      //setShowCompleteSprint(true)
    }
  };

  return (
    <NavbarBoardStyled>
      <div className="board-view">
        <h4 className="board-name">
          <UnorderedListOutlined className="icon" /> To Do Kanban
        </h4>
      </div>
      <div className="board-filter">
        <div className="sprint-name">{name}</div>
        <Dropdown
          menu={{
            items: listActionProjects,
            onClick: handleChooseActionProject,
          }}
          className="action-project"
          overlayClassName="overlay-dropdown-action-project"
        >
          <button className="btn-more">
            <EllipsisOutlined className="dot" />
          </button>
        </Dropdown>
      </div>
    </NavbarBoardStyled>
  );
};

export default BoardBarTask;
