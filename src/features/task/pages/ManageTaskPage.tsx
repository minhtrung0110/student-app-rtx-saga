import React, { FC } from 'react';
import backgroundImage from 'src/asset/images/backgroundTask01.jpg';
import styled from 'styled-components';
import { THEME } from '../../../constants';
import BoardContent from '../components/BoardContent/BoardContent';
import HeaderBarTask from '../components/HeaderBar/HeaderBarTask';
import BoardBarTask from '../components/BoardBar/BoardBarTask';

const TaskPage = styled.div`
  height: 100vh;
  overflow: hidden;
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
const ManageTaskPage: FC = () => {
  return (
    <TaskPage style={{ backgroundImage: `url(${backgroundImage})` }}>
      <HeaderBarTask />
      <BoardBarTask />
      <BoardContent />
    </TaskPage>
  );
};

export default ManageTaskPage;
