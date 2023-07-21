// Libraries
import React, { FC, useCallback, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { AxiosError } from 'axios';

// Components
import { Column } from 'src/features/task/components/Column/Column';
import { BtnCancelStyledTask, BtnOkStyledTask } from 'src/constants/component-styled';

// Actions
import { projectActions } from 'src/features/task/projectSlice';

// Models
import { DataDnd, Task, TaskCreate, TNotification } from 'src/models';

// Apis
// Utils
import { sortArray, updateTaskAfterDND } from 'src/utils/arrayUtils';

// Styles
import { BoxNewColumn, Container, Lists } from './BoardContent.styles';

// Hooks
import { useCreateTask, useDeleteTask, useDragAndDrop, useUpdateTask } from 'src/queries/task';
import { useCreateColumn } from 'src/queries/column';
import { useGetColumnTasks } from 'src/queries';
import { useAppDispatch } from 'src/app/hooks';

interface BoardContentProps {
  projectId: string | number;
}

const BoardContent: FC<BoardContentProps> = ({ projectId }) => {
  // Queries
  const query = useGetColumnTasks();
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: createTask } = useCreateTask();
  const { mutate: destroyTask } = useDeleteTask();
  const { mutate: dragAndDropTask } = useDragAndDrop();
  const { mutate: createColumn } = useCreateColumn();

  // State
  const [isOpenNewColForm, setIsOpenNewColForm] = useState<boolean>(false);
  const [newColTitle, setNewColTitle] = useState<string>('');

  // Dispatch
  const dispatch = useAppDispatch();

  // Variables
  const listTaskColumns = sortArray(query.useGetColumns?.data).map(col => {
    const array = (query.useGetTasks?.data || []).filter(task => task.column_id === col._id);
    const newArray = [...array];

    return { ...col, tasks: sortArray(newArray) };
  });

  // Handle Drag and Drop
  const onDragEnd = useCallback(
    result => {
      updateStateTask(
        query.useGetTasks?.data,
        result.source,
        result.destination,
        result.draggableId,
      );
    },
    [query.useGetTasks?.data],
  );

  const updateStateTask = (listTasks, source, destination, id) => {
    const taskMixture = updateTaskAfterDND(listTasks, destination, source, id);
    const data: DataDnd = {
      old_tasks: listTasks,
      tasks: taskMixture.tasks,
      updated: taskMixture.updated,
    };
    dragAndDropTask(data);
  };

  // Create New Column
  const handleCreateNewColumn = async () => {
    const newColumn = {
      title: newColTitle,
      project_id: projectId,
      status: 1,
      sort: Number(query.useGetColumns?.data?.length),
    };
    // action
    createColumn(newColumn);
    setNewColTitle('');
    setIsOpenNewColForm(false);
  };

  // Create New Task
  const handleCreateCard = useCallback((task: TaskCreate) => {
    createTask(task);
  }, []);

  // Update task
  const handleUpdateTask = (task: Task) => {
    updateTask(task);
  };

  // Delete Task
  const handleDeleteTask = (_id: string) => {
    destroyTask(_id);
  };

  // Notification
  useEffect(() => {
    if (query.useGetColumns.isError) {
      const error = query.useGetColumns.error as AxiosError;
      const noti: TNotification = {
        type: 'error',
        message: 'Loading Columns Failed',
        description: error.message,
        duration: 3,
        init: false,
      };
      dispatch(projectActions.fetchNotification(noti));
    }
    if (query.useGetTasks.isError) {
      const error = query.useGetTasks.error as AxiosError;
      const noti: TNotification = {
        type: 'error',
        message: 'Loading Tasks Failed',
        description: error.message,
        duration: 3,
        init: false,
      };
      dispatch(projectActions.fetchNotification(noti));
    }
  }, [query.useGetColumns.isError, query.useGetTasks.isError]);

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Lists>
          {listTaskColumns?.length > 0 &&
            listTaskColumns.map((list: any) => (
              <Column
                key={list._id}
                project_id={projectId}
                list={list}
                cards={list.tasks}
                onCreate={handleCreateCard}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          <BoxNewColumn>
            {!isOpenNewColForm && (
              <div
                className="btn-add-column"
                onClick={() => {
                  setIsOpenNewColForm(true);
                }}
              >
                <PlusOutlined className="icon-add" /> Add New Column
              </div>
            )}
            {isOpenNewColForm && (
              <>
                <TextArea
                  size="middle"
                  placeholder="Enter new column"
                  className="input-enter-new-column "
                  value={newColTitle}
                  onChange={e => setNewColTitle(e.target.value)}
                  onKeyDown={event => event.key === 'Enter' && handleCreateNewColumn()}
                />
                <div className="ft-btn">
                  <BtnOkStyledTask onClick={handleCreateNewColumn}>Add</BtnOkStyledTask>
                  <BtnCancelStyledTask>
                    <CloseOutlined
                      className="cancel-new-column"
                      onClick={() => setIsOpenNewColForm(false)}
                    />
                  </BtnCancelStyledTask>
                </div>
              </>
            )}
          </BoxNewColumn>
        </Lists>
      </DragDropContext>
    </Container>
  );
};

export default BoardContent;
