// Libraries
import React, { FC, useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

// Hooks
import { useAppDispatch } from 'src/app/hooks';
import { useDataQueries } from 'src/features/task/projectQuery';

// Components
import { Column } from 'src/features/task/components/Column/Column';

// Actions
import { projectActions } from 'src/features/task/projectSlice';

// Models
import { DataDnd, DataNewTask, IColumnCreate, Task, TaskCreate, TaskDnd } from 'src/models';

// Utils
import { sortArray, updateTaskAfterDND } from 'src/utils/arrayUtils';

// Styles
import { BoxNewColumn, Container, Lists } from './BoardContent.styles';
import { BtnCancelStyledTask, BtnOkStyledTask } from 'src/constants/component-styled';
import { useMutation } from '@tanstack/react-query';
import columnApi from '../../../../api/columnApi';

interface BoardContentProps {
  projectId: string | number;
}

const BoardContent: FC<BoardContentProps> = ({ projectId }) => {
  // Queries
  const query = useDataQueries();
  const createColumnAction = useMutation({
    mutationFn: (body: IColumnCreate) => {
      return columnApi.add(body);
    },
  });
  // State
  const [isOpenNewColForm, setIsOpenNewColForm] = useState<boolean>(false);
  const [newColTitle, setNewColTitle] = useState<string>('');

  // Selector - Dispatch
  const dispatch = useAppDispatch();

  // Variables
  console.log('Columns: ', sortArray(query.queryColumns?.data));
  const listTaskColumns = sortArray(query.queryColumns?.data).map(col => {
    const array = (query.queryTasks?.data || []).filter(task => task.column_id === col._id);
    const newArray = [...array];

    return { ...col, tasks: sortArray(newArray) };
  });

  // Handle Drag and Drop
  const onDragEnd = useCallback(result => {
    updateStateTask([], result.source, result.destination, result.draggableId);
  }, []);
  const updateStateTask = (listTasks, source, destination, id) => {
    const taskMixture = updateTaskAfterDND(listTasks, destination, source, id);
    const dnd: TaskDnd = { _id: id, column_id: destination.droppableId, sort: destination.index };
    const data: DataDnd = {
      dnd,
      tasks: taskMixture.tasks,
      updated: taskMixture.updated,
    };
    console.log('Data Sau DND:', data);
    dispatch(projectActions.fetchTaskDragAndDrop(data));
  };

  // Create New Column
  const handleCreateNewColumn = async () => {
    const newColumn = {
      title: newColTitle,
      project_id: projectId,
      status: 1,
      sort: Number(query.queryColumns?.data?.length),
    };
    // add
    createColumnAction.mutate(newColumn, {
      onSuccess: () => {
        query.queryColumns.refetch();
      },
    });
    /// dispatch(projectActions.addColumn(newColumn));
    setNewColTitle('');
    setIsOpenNewColForm(false);
  };

  // Create New Task
  const handleCreateCard = useCallback((task: TaskCreate) => {
    const data: DataNewTask = {
      new_task: task,
      tasks: [],
    };
    dispatch(projectActions.addTask(data));
    // const response = await taskApi.add(task);
    //  if (response.status === 200) {
    //     const listTask = [...tasks, response.data];
    //     dispatch(projectActions.fetchTaskColumn(listTask));
    //     return response.data;
    // }
  }, []);

  // Update task
  const handleUpdateTask = (task: Task) => {
    dispatch(projectActions.updateTask(task));
  };
  // Delete Task
  const handleDeleteTask = (_id: string) => {
    dispatch(projectActions.deleteTask(_id));
  };

  //console.log('Cards:', columns);
  //
  console.log('ListTask:', listTaskColumns);
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
