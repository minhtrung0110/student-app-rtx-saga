// Libraries
import React, { FC, useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

// Hooks
import { useAppDispatch, useAppSelector } from 'src/app/hooks';

// Components
import { Column } from '../Column/Column';

// Actions
import { projectActions, selectColumnList, selectTaskList } from 'src/features/task/projectSlice';

// Models
import { DataDnd, DataNewTask, Task, TaskCreate, TaskDnd } from 'src/models';

// Utils
import { sortArray, updateTaskAfterDND } from 'src/utils/arrayUtils';

// Styles
import { BoxNewColumn, Container, Lists } from './BoardContent.styles';
import { BtnCancelStyledTask, BtnOkStyledTask } from 'src/constants/component-styled';

interface BoardContentProps {
  projectId: string | number;
}

const BoardContent: FC<BoardContentProps> = ({ projectId }) => {
  // State
  const [isOpenNewColForm, setIsOpenNewColForm] = useState<boolean>(false);
  const [newColTitle, setNewColTitle] = useState<string>('');

  // Selector - Dispatch
  const dispatch = useAppDispatch();
  const columns = useAppSelector(selectColumnList);
  const tasks = useAppSelector(selectTaskList);

  // Variables
  const newBoardColumns = [...columns]; // clone array of columns to Sort Column with sort key
  const listTaskColumns = sortArray(newBoardColumns).map(col => {
    const array = tasks.filter(task => task.column_id === col._id);
    console.log('Array', tasks);
    const newArray = [...array];

    return { ...col, tasks: array };
  });

  // Handle Drag and Drop
  const onDragEnd = useCallback(
    result => {
      updateStateTask(tasks, result.source, result.destination, result.draggableId);
    },
    [tasks],
  );
  const updateStateTask = (listTasks, source, destination, id) => {
    const taskMixture = updateTaskAfterDND(listTasks, destination, source, id);
    const dnd: TaskDnd = { _id: id, column_id: destination.droppableId, sort: destination.index };
    const data: DataDnd = {
      dnd,
      tasks: taskMixture.tasks,
      updated: taskMixture.updated,
    };
    // console.log('Data Sau DND:', data.tasks);
    dispatch(projectActions.fetchTaskDragAndDrop(data));
  };

  // Create New Column
  const handleCreateNewColumn = async () => {
    const newColumn = {
      title: newColTitle,
      project_id: projectId,
      status: 1,
      sort: columns.length,
    };
    dispatch(projectActions.addColumn(newColumn));
    setNewColTitle('');
    setIsOpenNewColForm(false);
  };

  // Create New Task
  const handleCreateCard = useCallback(
    (task: TaskCreate) => {
      const data: DataNewTask = {
        new_task: task,
        tasks,
      };
      dispatch(projectActions.addTask(data));
      // const response = await taskApi.add(task);
      //  if (response.status === 200) {
      //     const listTask = [...tasks, response.data];
      //     dispatch(projectActions.fetchTaskColumn(listTask));
      //     return response.data;
      // }
    },
    [tasks],
  );

  // Update task
  const handleUpdateTask = (task: Task) => {
    dispatch(projectActions.updateTask(task));
  };
  // Delete Task
  const handleDeleteTask = (_id: string) => {
    dispatch(projectActions.deleteTask(_id));
  };

  //console.log('Cards:', columns);
  console.log('ListTaskColumn:', listTaskColumns);
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
                  //  ref={newColInputRef}
                  onKeyDown={event => event.key === 'Enter' && handleCreateNewColumn(event)}
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
