// Libraries
import React, { FC } from 'react';
import styled from 'styled-components';
import { notification } from 'antd';

// Hooks
import { useAppDispatch, useAppSelector } from 'src/app/hooks';

// Actions
import {
  selectProject,
  selectProjectError,
  selectProjectFilter,
} from 'src/features/task/projectSlice';

// Constants
import { THEME } from 'src/constants';
import backgroundImage from 'src/asset/images/backgroundTask01.jpg';

// Components
import BoardContent from 'src/features/task/components/BoardContent/BoardContent';
import HeaderBarTask from 'src/features/task/components/HeaderBar/HeaderBarTask';
import BoardBarTask from 'src/features/task/components/BoardBar/BoardBarTask';
import { useQuery } from '@tanstack/react-query';
import projectApi from '../../../api/projectApi';
import { PROJECT_ID } from '../../../constants/common';

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
    font-size: inherit;
    font-weight: inherit;
    cursor: pointer;

    &:focus {
      background-color: white;
      //  border: 1px solid var(--appbar-bg-color);
      cursor: text;
    }
  }
`;

type NotificationType = 'success' | 'info' | 'warning' | 'error';
const ManageTaskPage: FC = () => {
  // State
  const [api, contextHolder] = notification.useNotification();

  // Selector - Dispatch
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectProject);
  const filter = useAppSelector(selectProjectFilter);
  const error = useAppSelector(selectProjectError);
  const openNotificationWithIcon = (type: NotificationType, message, description, duration) => {
    api[type]({
      message,
      description,
      duration,
    });
  };

  // Get Data Project
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectApi.getById(PROJECT_ID),
    cacheTime: 60 * 1000,
    staleTime: 50 * 1000,
  });
  // Notification

  return (
    <>
      {isLoading ? (
        <h1>Loading....</h1>
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
