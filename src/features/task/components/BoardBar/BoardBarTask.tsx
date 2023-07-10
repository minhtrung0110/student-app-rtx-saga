import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { DeleteOutlined, EllipsisOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { THEME } from '../../../../constants';
import { Dropdown } from 'antd';

interface BoardBarTaskProps {
  // Các prop và kiểu dữ liệu tương ứng
}

const divideMixin = `
  content: '';
  position: absolute;
  border: 1.5px solid var(--white);
  right: -14px;
  height: 1.8rem;
`;
export const NavbarBoardStyled = styled.div`
  height: 3.2rem;
  padding: 0 calc(2 * 10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.13);
  font-size: 1rem;

  .board-name {
    color: ${THEME?.token?.light};
  }

  .board-view {
    .board-name {
      color: ${THEME?.token?.light};
      display: flex;
      align-items: center;

      .icon {
        margin-right: 0.5rem;
        font-size: 1.25rem;
        padding: 0;
      }
    }
  }

  .board-filter {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .sprint-name {
      height: 2rem;
      background-color: ${THEME?.token?.light};
      padding: 1rem;
      border-radius: ${THEME?.token?.borderRadius};
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-right: 1.4rem;
      font-weight: bold;

      &:after {
        ${divideMixin};
        top: 0;
      }
    }

    .filter-btn {
      height: 2rem;
      background-color: ${THEME?.token?.light};
      padding: 1rem;
      border-radius: ${THEME?.token?.borderRadius};
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-right: 1.4rem;

      &:hover {
      }

      &:after {
        ${divideMixin}
      }

      .filter-task {
        font-weight: 450;
        display: flex;
        align-items: center;

        .icon {
          font-weight: 200;
          color: #81807f;
          font-size: var(--14px);
          margin-right: 0.5rem;
        }
      }
    }

    .search {
      position: relative;
      margin-right: 1.4rem;

      &:after {
        ${divideMixin};
        top: 0;
      }
    }

    .avatar-group {
      margin-right: 1.4rem;
      position: relative;
      display: flex;
      align-items: center;

      &:hover {
      }

      &:after {
        ${divideMixin}
      }
    }

    .action-project {
      height: 2rem;
      cursor: pointer;
      background-color: ${THEME?.token?.light};
      padding: 1rem;
      border-radius: ${THEME?.token?.borderRadius};
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-right: 1.4rem;

      &:hover {
      }

      &:after {
        ${divideMixin}
      }
    }

    .btn-more {
      line-height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: hsla(0deg, 0%, 100%, 0.24);
      border: none;
      padding: 0.4rem;
      color: var(--gray97-color);
      border-radius: 2px;
      margin-left: 5px;

      &:hover {
        background-color: hsla(0deg, 0%, 100%, 0.14);
      }
    }
  }
`;

const BoardBarTask: FC<BoardBarTaskProps> = (
  {
    /* props */
  },
) => {
  const [showConfirmDelete, setIsShowConfirmDelete] = useState<boolean>(false);
  const listActionProjects = [
    // {
    //     label: 'Hoàn Thành Chu Kỳ Phát Triển',
    //     key: '1',
    //     icon: <FaTrophy />,
    // },
    {
      label: 'Xóa Chu Kỳ Phát Triển',
      key: '1',
      icon: <DeleteOutlined />,
    },
  ];
  const handleChooseActionProject = ({ key }) => {
    if (key === '2') {
      setIsShowConfirmDelete(true);
    } else if (key === '1') {
      //setShowCompleteSprint(true)
    }
  };
  return (
    <NavbarBoardStyled>
      <div className="board-view">
        <h4 className="board-name">
          <UnorderedListOutlined className="icon" /> Sprint 1
        </h4>
      </div>
      <div className="board-filter">
        <div className="sprint-name">{'Dự Án STR'}</div>
        {/*<FilterProject onFilter={onFilter} listmember={members.members} />*/}
        {/*<GroupMember defaultMembers={members.members} sizeAvatar={'small'} />*/}
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
      {/*</div>*/}
      {/*<Modal title="" open={showCompleteSprint}*/}
      {/*       destroyOnClose*/}
      {/*       maskClosable={true}*/}
      {/*       onCancel={() => setShowCompleteSprint(false)}*/}
      {/*       footer={null}*/}
      {/*       width={450}*/}
      {/*       style={{top: 80}}*/}
      {/*>*/}
      {/*    <CompleteSprint sprint={sprint} onComplete={handleCompleteSprint} onCancel={setShowCompleteSprint} />*/}
      {/*</Modal>*/}
      {/*<ConfirmModal*/}
      {/*  open={showConfirmDelete}*/}
      {/*  title="Xác Nhận Xóa"*/}
      {/*  content={*/}
      {/*    <div*/}
      {/*      dangerouslySetInnerHTML={{*/}
      {/*        __html: `Bạn Có Thực Sự Muốn Xóa Chu Kỳ <strong>${sprint.title}</strong> Này ? `,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  }*/}
      {/*  textCancel="Hủy"*/}
      {/*  textOK="Xóa"*/}
      {/*  onCancel={() => setIsShowConfirmDelete(false)}*/}
      {/*  onOK={handleRemoveSprint}*/}
      {/*/>*/}
    </NavbarBoardStyled>
  );
};

export default BoardBarTask;
