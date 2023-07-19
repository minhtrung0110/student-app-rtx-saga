// Libraries
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { notification } from 'antd';

// Hooks
import { useAppDispatch, useAppSelector } from 'src/app/hooks';

// Actions
import {
  projectActions,
  selectProject,
  selectProjectError,
  selectProjectFilter,
} from 'src/features/task/projectSlice';

// Constants
import { THEME } from 'src/constants';
import backgroundImage from 'src/asset/images/backgroundTask01.jpg';

// Components
import BoardContent from '../components/BoardContent/BoardContent';
import HeaderBarTask from '../components/HeaderBar/HeaderBarTask';
import BoardBarTask from '../components/BoardBar/BoardBarTask';

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
  useEffect(() => {
    dispatch(projectActions.fetchProjectList(filter));
  }, []);

  // Notification

  return (
    <TaskPage style={{ backgroundImage: `url(${backgroundImage})` }}>
      {contextHolder}
      <HeaderBarTask />
      <BoardBarTask name={!!project ? project.name : ''} />
      <BoardContent projectId={!!project ? project._id : ''} />
    </TaskPage>
  );
};

export default ManageTaskPage;
