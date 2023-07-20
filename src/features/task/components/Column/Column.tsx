// Libraries
import React, { FC, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { isEqual } from 'lodash';
import { Input } from 'antd';
import { CloseOutlined, DeleteOutlined, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { v4 as uuidv4 } from 'uuid';

// Models
import { IColumn, Task, TaskCreate } from 'src/models';

// Styles
import { AreaAddTask, ContainerColumn, Footer, Header, MoreButton } from './Column.styles';
import { BtnCancelStyledTask, BtnOkStyledTask } from 'src/constants/component-styled';

// Components
import { Card } from 'src/features/task/components/Card/Card';
import { StrictModeDroppable } from 'src/components/commoms/StrictModeDroppable';
import ConfirmModal from 'src/components/commoms/ConfirmModal';

// Hook and Actions
import { useMutation, useQueryClient } from '@tanstack/react-query';
import columnApi from '../../../../api/columnApi';

// Variables
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  background: 'white',
  padding: '10px 10px 10px 8px',
  marginBottom: '5px',
  borderRadius: '5px',
  borderBottom: '1px solid rgb(178,185,197)',
  ...draggableStyle,
});
const getListStyle = (isDraggingOver: boolean) => ({
  minHeight: 20,
});
const items = [
  {
    label: 'Remove',
    key: '1',
    icon: <DeleteOutlined />,
    danger: true,
  },
];

interface ColumnProps {
  list: any;
  cards: Task[];
  onCreate: (task: TaskCreate) => void;
  project_id: string | number;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const compareProps = (prev, next) => {
  const isEqualList = isEqual(prev.list, next.list);
  const isEqualCards = isEqual(prev.cards, next.cards);
  //  console.log(isEqualList, isEqualCards);
  return isEqualList && isEqualCards;
};

export const Column: FC<ColumnProps> = React.memo(
  ({ list, cards, onCreate, onUpdateTask, onDeleteTask, project_id }) => {
    // Queries
    const queryClient = useQueryClient();
    const updateColumnAction = useMutation({
      mutationFn: (body: IColumn) => {
        return columnApi.update(body);
      },
      onSuccess: res => {
        const col = { _id: res.data._id, title: res.data.title, sort: res.data.sort };
        // console.log('Data', col);
        // queryClient.setQueryData(['columns', res.data._id], res.data);
        queryClient.invalidateQueries({ queryKey: ['columns'], exact: true });
      },
    });
    const deleteColumnAction = useMutation({
      mutationFn: (id: string) => {
        return columnApi.remove(id);
      },
      onSuccess: response => {
        queryClient.invalidateQueries({ queryKey: ['columns'], exact: true });
      },
    });
    // State
    const [columnTitle, setColumnTitle] = useState<string>(list._id);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [valueNewCard, setValueNewCard] = useState<string>('');
    const [isAddCard, setIsAddCard] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const handleMenuClick = e => {
      if (e.key === '1') {
        setOpen(false);
        setShowConfirmModal(true);
      } else if (e.key === '3') {
        setOpen(false);
      } else {
      }
    };
    const handleOpenChange = flag => {
      setOpen(flag);
    };
    const handleColumnTitleBlur = e => {
      handleUpdateColumn(e);
      e.target.blur();
    };
    const selectAllInlineTex = e => {
      e.target.focus();
    };

    // Update Column
    const handleUpdateColumn = async (evt: any) => {
      const updateColumn = {
        _id: list._id,
        title: evt.target.value,
        project_id: project_id,
        sort: list.sort,
        status: list.status,
      };
      // action
      updateColumnAction.mutate(updateColumn);
      evt.target.blur();
    };

    // Create New Task
    const handleCreateTask = (value: string) => {
      if (value !== '') {
        const newCard = {
          _id: uuidv4(),
          title: value,
          project_id: project_id,
          column_id: list._id,
          priority: {
            _id: '64ae27531e93458077135753',
            name: 'None',
          },
          sort: cards.length,
          status: 1,
        };
        onCreate(newCard as TaskCreate);
        setValueNewCard('');
        setIsAddCard(false);
      }
    };

    //Delete Column
    const handleDeleteColumn = () => {
      if (list.tasks.length <= 0 && list.sort >= 2) {
        deleteColumnAction.mutate(list._id);
      }
    };
    return (
      <ContainerColumn>
        <Header>
          <Input
            size="middle"
            type="text"
            placeholder="Điền tên côt"
            className="minhtrung-content-editable input-header"
            value={columnTitle}
            spellCheck={false}
            onChange={e => setColumnTitle(e.target.value)}
            onClick={selectAllInlineTex}
            onBlur={handleColumnTitleBlur}
            onMouseDown={e => e.preventDefault()}
            onKeyDown={event => event.key === 'Enter' && handleUpdateColumn(event)}
          />
          <MoreButton
            className="dropdown-btn"
            menu={{
              items,
              onClick: handleMenuClick,
            }}
            onOpenChange={handleOpenChange}
            open={open}
            placement="bottomRight"
            overlayStyle={{
              padding: '0',
              margin: '0',
            }}
            overlayClassName="overlay-more"
          >
            <div>
              <EllipsisOutlined className="dot" />
            </div>
          </MoreButton>
        </Header>
        <StrictModeDroppable droppableId={list._id}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <>
                {cards?.length > 0 &&
                  cards.map((post: Task, index: number) => (
                    <Draggable key={post._id} draggableId={post._id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          <Card
                            key={post._id}
                            task={post}
                            onUpdate={onUpdateTask}
                            onDelete={onDeleteTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
              </>

              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
        {isAddCard && (
          <AreaAddTask className="add-new-card-area">
            <TextArea
              rows={3}
              placeholder="Enter new task"
              className="input-enter-card"
              value={valueNewCard}
              onChange={e => setValueNewCard(e.target.value)}
              //  ref={newCardRef}
              onKeyDown={event => event.key === 'Enter' && handleCreateTask(valueNewCard)}
            />

            <div className={'gr-btn'}>
              <BtnOkStyledTask onClick={() => handleCreateTask(valueNewCard)}>Add</BtnOkStyledTask>
              <BtnCancelStyledTask onClick={() => setIsAddCard(false)}>
                <CloseOutlined className="cancel-new-card" />
              </BtnCancelStyledTask>
            </div>
          </AreaAddTask>
        )}

        <Footer>
          <div className="add-card-task" onClick={() => setIsAddCard(true)}>
            <PlusOutlined className="footer-icon" /> Add New Task
          </div>
        </Footer>

        {/*---Modal---*/}
        <ConfirmModal
          open={showConfirmModal}
          title="Xác Nhận Xóa"
          content={
            <div
              dangerouslySetInnerHTML={{
                __html: `Bạn Có Thực Sự Muốn Xóa Cột <strong>${columnTitle}</strong> Này ? `,
              }}
            />
          }
          textCancel="Hủy"
          textOK="Xóa"
          onCancel={() => setShowConfirmModal(false)}
          onOK={handleDeleteColumn}
        />
      </ContainerColumn>
    );
  },
  compareProps,
);
