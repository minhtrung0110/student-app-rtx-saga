import Skeleton from 'antd/es/skeleton';
import React from 'react';
import styled from 'styled-components';
import { THEME } from 'src/constants';

interface KanbanSkeletonProps {
  rows?: number;
  items?: number;
}

const KabanStyled = styled.div`
  background-color: #fff;
  border-radius: var(--border-radius);
  padding: 1rem 2.5rem;
  margin: var(--pd-content);

  .title {
    height: 3rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .text {
      width: 20rem;
    }
  }

  .header {
    padding: 1rem 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 4rem;
    margin-bottom: 2rem;
  }

  .content {
    display: flex;
    justify-content: space-around;

    .column {
      width: 15rem;
      border: 1px solid #eee;
      display: flex;

      flex-direction: column;
      align-items: center;


    }

    .column-end {
      height: 30rem;
    }
`;
const ColumnStyled = styled.div`
  min-width: 220px;
  padding: 8px 11px;
  box-sizing: border-box;
  border-radius: 8px;
  background: ${THEME.token.bgColumTask};
  width: 230px;
  min-height: 80px;
  max-height: 780px;
  flex: 0 0 auto;
  max-width: 272px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow-y: auto;
`;
const TaskItem = styled(Skeleton.Input)`
  background-color: white;
  padding: 10px;
  min-height: 50px;
  border-radius: 3px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const KanbanSkeleton: React.FC<KanbanSkeletonProps> = ({ rows = 5, items = 5 }) => {
  return (
    <KabanStyled>
      <div className={'title'}>
        <Skeleton.Input active={true} size={'small'} className={'text'} />
      </div>
      <div className={'header'}>
        <Skeleton.Input active={true} size={'default'} />
        <Skeleton.Button active={true} size={'default'} />
        <Skeleton.Button active={true} size={'default'} />
        <Skeleton.Input active={true} size={'default'} />
        <Skeleton.Input active={true} size={'default'} />
        <Skeleton.Button active={true} size={'default'} />
        <Skeleton.Button active={true} size={'default'} />
        <Skeleton.Button active={true} size={'default'} />
        <Skeleton.Button active={true} size={'default'} />
      </div>
      <div className={'content'}>
        <ColumnStyled>
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </ColumnStyled>
        <ColumnStyled>
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </ColumnStyled>
        <ColumnStyled>
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </ColumnStyled>
        <ColumnStyled>
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </ColumnStyled>
        <div className={'column-end'}>
          <TaskItem />
        </div>
      </div>
    </KabanStyled>
  );
};

export default KanbanSkeleton;
