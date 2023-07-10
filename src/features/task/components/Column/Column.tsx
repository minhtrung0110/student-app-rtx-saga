import React, { FC, useState } from 'react';
import { ICard, IList } from '../../../../models';
import { AreaAddTask, ContainerColumn, Footer, Header, MoreButton } from './Column.styles';
import { Draggable } from 'react-beautiful-dnd';
import { Card } from '../Card/Card';
import uuidv1 from 'uuid/v1';
import { StrictModeDroppable } from '../../../../components/commoms/StrictModeDroppable';
import { Input } from 'antd';
import ConfirmModal from 'src/components/commoms/ConfirmModal';
import { CloseOutlined, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { BtnCancelStyledTask, BtnOkStyledTask } from '../../../../constants/component-styled';

interface ColumnProps {
  list: IList;
  cards: ICard[];
  cardsDispatch: any;
  listsDispatch: any;
}

export const Column: FC<ColumnProps> = ({ list, cards, cardsDispatch, listsDispatch }) => {
  const [columnTitle, setColumnTitle] = useState<string>(list.listTitle);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [valueNewCard, setValueNewCard] = useState('');
  const [isAddCard, setIsAddCard] = useState(false);
  const [open, setOpen] = useState(false);
  console.log('Column List Initialized:', list, cards);
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    background: 'white',
    padding: '10px',
    marginBottom: '5px',
    borderRadius: '5px',
    borderBottom: '1px solid rgb(178,185,197)',
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    minHeight: 70,
  });

  const handleNameChange = (evt: any) => {
    const { value } = evt.target;
    listsDispatch({
      type: 'UPDATE_NAME',
      payload: { id: list.id, value },
    });
  };
  const handleDeleteColumn = () => {
    listsDispatch({
      type: 'REMOVE',
      payload: { id: list.id },
    });
  };
  const handleCreateCard = value => {
    if (value !== '') {
      cardsDispatch({
        type: 'ADD',
        payload: {
          listId: list.id,
          text: value,
          id: uuidv1(),
        },
      });
      setIsAddCard(false);
    }
  };
  console.log('List Card:', cards);
  const handleColumnTitleBlur = e => {
    const newColumn = {
      ...list,
      title: columnTitle,
    };
    handleNameChange(e);
    e.target.blur();
    // onUpdateColumn(newColumn)
  };
  const selectAllInlineTex = e => {
    e.target.focus();
    // e.target.select()
  };
  const handleMenuClick = e => {
    if (e.key === '1') {
      setOpen(false);
      setShowConfirmModal(true);
    } else if (e.key === '3') {
      setOpen(false);
    } else {
    }
  };
  const items = [
    {
      label: 'Xóa Cột',
      key: '1',
    },
  ];
  const handleOpenChange = flag => {
    setOpen(flag);
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
          onKeyDown={event => event.key === 'Enter' && handleColumnTitleBlur(event)}
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
      <StrictModeDroppable droppableId={list.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <>
              {cards?.length > 0 &&
                cards.map((post: ICard, index: number) => (
                  <Draggable key={post.id} draggableId={`draggable-${post.id}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        <Card
                          key={post.id}
                          text={post.text}
                          id={post.id}
                          cardsDispatch={cardsDispatch}
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
            onKeyDown={event => event.key === 'Enter' && handleCreateCard(valueNewCard)}
          />

          <div className={'gr-btn'}>
            <BtnOkStyledTask onClick={() => handleCreateCard(valueNewCard)}>Add</BtnOkStyledTask>
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
};
