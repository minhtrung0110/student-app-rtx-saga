// Libraries
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { notification } from 'antd';

// Constants
import { THEME } from 'src/constants';
import backgroundImage from 'src/asset/images/backgroundTask01.jpg';

// Components
import BoardContent from 'src/features/task/components/BoardContent/BoardContent';
import HeaderBarTask from 'src/features/task/components/HeaderBar/HeaderBarTask';
import BoardBarTask from 'src/features/task/components/BoardBar/BoardBarTask';
import KanbanSkeleton from 'src/components/commoms/Skeleton/KanbanSkeleton';

// Hooks
import { useGetProjects } from 'src/queries/project';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { projectActions, selectNotification } from 'src/features/task/projectSlice';

const TaskPage = styled.div`
  height: 1400px;
  background-color: #fff;
  border-radius: ${THEME?.token?.borderRadius};
  margin: ${THEME?.token?.pdContent};
  padding: ${THEME?.token?.padding} / 2;
  object-fit: cover;

  .trello-minhtrung-container {
    margin: 0 15px;
    padding: 0;
  }

  .minhtrung-content-editable {
    background-color: inherit;
    border: none;
    font-size: 14px;
    cursor: pointer;
    font-weight: 600;

    &:focus {
      background-color: white;
      //  border: 1px solid var(--appbar-bg-color);
      cursor: text;
    }
  }
`;

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

const ManageTaskPage: FC = () => {
  // State
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType, message, description, duration) => {
    api[type]({
      message,
      description,
      duration,
    });
  };

  // Get Data Project
  const { data, isLoading, isError, error } = useGetProjects();

  // Notification
  const notifySelector = useAppSelector(selectNotification);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isError) {
      openNotificationWithIcon('error', 'Load Data Project Failed', error.message, 3);
    }
  }, [isError]);
  useEffect(() => {
    if (!notifySelector.init) {
      openNotificationWithIcon(
        notifySelector.type,
        notifySelector.message,
        notifySelector.description,
        notifySelector.duration,
      );
      dispatch(
        projectActions.fetchNotification({
          type: 'info',
          message: '',
          description: '',
          duration: 0.1,
          init: true,
        }),
      );
    }
  }, [notifySelector]);

  return (
    <>
      {isLoading ? (
        <KanbanSkeleton />
      ) : (
        <>
          <TaskPage style={{ backgroundImage: `url(${backgroundImage})` }}>
            {contextHolder}
            <HeaderBarTask />
            <BoardBarTask name={!!data?.data ? data.data.name : ''} />
            <BoardContent projectId={!!data?.data ? data?.data._id : ''} />
          </TaskPage>
        </>
      )}
    </>
  );
};

export default ManageTaskPage;
