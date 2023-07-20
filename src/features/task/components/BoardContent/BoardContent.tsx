// Libraries
import React, { FC, useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

// Hooks
import { useDataQueries } from 'src/features/task/projectQuery';

// Components
import { Column } from 'src/features/task/components/Column/Column';

// Actions
// Models
import { IColumnCreate, Task, TaskCreate } from 'src/models';

// Apis
import columnApi from 'src/api/columnApi';
import taskApi from 'src/api/taskApi';

// Utils
import { sortArray, updateTaskAfterDND } from 'src/utils/arrayUtils';

// Styles
import { BoxNewColumn, Container, Lists } from './BoardContent.styles';
import { BtnCancelStyledTask, BtnOkStyledTask } from 'src/constants/component-styled';
import { Updater, useMutation, useQueryClient } from '@tanstack/react-query';

interface BoardContentProps {
  projectId: string | number;
}

const BoardContent: FC<BoardContentProps> = ({ projectId }) => {
  // Queries
  const query = useDataQueries();
  const queryClient = useQueryClient();
  const createColumnAction = useMutation({
    mutationFn: (body: IColumnCreate) => {
      return columnApi.add(body);
    },
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['columns'], exact: true });
    },
  });

  const createTaskAction = useMutation({
    mutationFn: (body: Task) => {
      return taskApi.add(body);
    },
    // When mutate is called:
    onMutate: async newTodo => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(['tasks']);

      // Optimistically update to the new value
      const updateTasks: Updater<Task[], any> = old => [...(old || []), newTodo];
      queryClient.setQueryData(['tasks'], a => updateTasks(a));

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTodos);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  const updateTaskAction = useMutation({
    mutationFn: (body: Task) => {
      return taskApi.update(body);
    },
    onMutate: async newTodo => {
      await queryClient.cancelQueries({ queryKey: ['tasks', newTodo._id] });
      const previousTodo = queryClient.getQueryData(['tasks', newTodo._id]);
      queryClient.setQueryData(['tasks', newTodo._id], newTodo);
      return { previousTodo, newTodo };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['tasks', context?.newTodo._id], context?.previousTodo);
    },
    onSettled: res => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  const deleteTaskAction = useMutation({
    mutationFn: (_id: string) => {
      return taskApi.remove(_id);
    },
    onMutate: async _id => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTodos = queryClient.getQueryData(['tasks']);
      const deletedTasks: Updater<Task[], any> = old => old.filter(todo => todo._id !== _id);
      queryClient.setQueryData(['tasks'], a => deletedTasks(a));
      return { previousTodos };
    },
    onError: (err, task, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTodos);
    },
    onSettled: res => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  const dragAndDrop = useMutation({
    mutationFn: (body: Task[]) => {
      return taskApi.updateTasks(body);
    },
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: ['tasks'], exact: true });
    },
  });

  // State
  const [isOpenNewColForm, setIsOpenNewColForm] = useState<boolean>(false);
  const [newColTitle, setNewColTitle] = useState<string>('');

  // Variables
  console.log('Columns: ', sortArray(query.queryColumns?.data));
  const listTaskColumns = sortArray(query.queryColumns?.data).map(col => {
    const array = (query.queryTasks?.data || []).filter(task => task.column_id === col._id);
    const newArray = [...array];

    return { ...col, tasks: sortArray(newArray) };
  });

  // Handle Drag and Drop
  const onDragEnd = useCallback(
    result => {
      console.log('ListTask:', query.queryTasks?.data);
      updateStateTask(
        query.queryTasks?.data,
        result.source,
        result.destination,
        result.draggableId,
      );
    },
    [query.queryTasks?.data],
  );

  const updateStateTask = (listTasks, source, destination, id) => {
    console.log('List tasks testing', listTasks);
    const taskMixture = updateTaskAfterDND(listTasks, destination, source, id);
    dragAndDrop.mutate(taskMixture.updated);
  };

  // Create New Column
  const handleCreateNewColumn = async () => {
    const newColumn = {
      title: newColTitle,
      project_id: projectId,
      status: 1,
      sort: Number(query.queryColumns?.data?.length),
    };
    // action
    createColumnAction.mutate(newColumn);
    setNewColTitle('');
    setIsOpenNewColForm(false);
  };

  // Create New Task
  const handleCreateCard = useCallback((task: TaskCreate) => {
    createTaskAction.mutate(task);
  }, []);

  // Update task
  const handleUpdateTask = (task: Task) => {
    updateTaskAction.mutate(task);
  };
  // Delete Task
  const handleDeleteTask = (_id: string) => {
    deleteTaskAction.mutate(_id);
  };

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
