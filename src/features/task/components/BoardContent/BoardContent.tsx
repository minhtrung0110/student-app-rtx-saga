import React, { FC, useCallback, useEffect, useReducer, useState } from 'react';
import { BoxNewColumn, Container, Lists } from './BoardContent.styles';
import { ICard, IList } from '../../../../models';
import { DragDropContext } from 'react-beautiful-dnd';
import { groupBy, isEmpty } from 'lodash';
import { cardsReducer, listsReducer } from '../../../../ruducer/reducer';
import { initialCards, initialLists, reorder } from '../../../../utils/initTask';
import { Column } from '../Column/Column';
import uuidv1 from 'uuid/v1';
import TextArea from 'antd/es/input/TextArea';
import { BtnCancelStyledTask, BtnOkStyledTask } from '../../../../constants/component-styled';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

interface BoardContentProps {
  // Các prop và kiểu dữ liệu tương ứng
}

const BoardContent: FC<BoardContentProps> = (
  {
    /* props */
  },
) => {
  const [isOpenNewColForm, setIsOpenNewColForm] = useState(false);
  const [newColTitle, setNewColTitle] = useState('');
  const listsFromLs = JSON.parse(localStorage.getItem('lists') || '');
  const cardsFromLs = JSON.parse(localStorage.getItem('cards') || '');
  //const bgColorFromLs = ls.get<string>('bgColor');

  //const [bgColor, setBgColor] = useState(bgColorFromLs ? bgColorFromLs : 'dodgerblue');

  const [cards, cardsDispatch] = useReducer(
    cardsReducer,
    isEmpty(cardsFromLs) ? initialCards : cardsFromLs,
  );

  const [lists, listsDispatch] = useReducer(
    listsReducer,
    isEmpty(listsFromLs) ? initialLists : listsFromLs,
  );

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
    localStorage.setItem('lists', JSON.stringify(lists));
    // ls.set<IList[]>('lists', lists);
  }, [cards, lists]);
  // const handleBgColorChange = (color: { hex: string }) => {
  //   setBgColor(color.hex);
  //   ls.set<string>('bgColor', color.hex);
  // };

  const onDragEnd = useCallback(
    result => {
      console.log('Result: ', result);
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      const itemsSplitByListIds = groupBy(cards, (card: any) => {
        return card.listId;
      });

      if (result.source.droppableId === result.destination.droppableId) {
        // Items are in the same list, so just re-order the list array
        const target = itemsSplitByListIds[result.destination.droppableId];
        const reordered: any = reorder<ICard>(
          [...target],
          result.source.index,
          result.destination.index,
        );

        // Get rid of old list and replace with updated one
        const filteredCards = cards.filter(
          (card: any) => card.listId !== result.source.droppableId,
        );

        cardsDispatch({
          type: 'SET',
          payload: { newState: [...filteredCards, ...reordered] },
        });
      } else {
        // Items are in different lists, so just change the item's listId

        const removeByIndex = (list: any[], index: number) => [
          ...list.slice(0, index),
          ...list.slice(index + 1),
        ];

        const source = cards.filter((card: ICard) => card.listId === result.source.droppableId);
        const sourceWithoutDragged = removeByIndex(source, result.source.index);

        const target = cards.filter(
          (card: ICard) => card.listId === result.destination.droppableId,
        );

        const itemWithNewId = {
          ...source[result.source.index],
          listId: result.destination.droppableId,
        };

        target.splice(result.destination.index, 0, itemWithNewId);

        const filteredCards = cards.filter(
          (card: any) =>
            card.listId !== result.source.droppableId &&
            card.listId !== result.destination.droppableId,
        );

        cardsDispatch({
          type: 'SET',
          payload: {
            newState: [...filteredCards, ...sourceWithoutDragged, ...target],
          },
        });
      }
    },
    [cards],
  );
  const handleCreateNewColumn = e => {
    listsDispatch({
      type: 'ADD',
      payload: {
        id: uuidv1(),
        listTitle: e.target.value,
      },
    });
    setNewColTitle('');
    setIsOpenNewColForm(false);
  };
  // console.log('List Column', lists);
  return (
    <Container>
      {/*<Options handleBgColorChange={handleBgColorChange} />*/}
      <DragDropContext onDragEnd={onDragEnd}>
        <Lists>
          {lists?.length > 0 &&
            lists.map((list: IList) => (
              <Column
                key={list.id}
                list={list}
                cards={cards.filter((card: ICard) => card.listId === list.id)}
                cardsDispatch={cardsDispatch}
                listsDispatch={listsDispatch}
              />
              // <h1>13</h1>
            ))}
          <BoxNewColumn>
            {!isOpenNewColForm && (
              <div
                className="btn-add-column"
                onClick={() => {
                  setIsOpenNewColForm(true);
                }}
              >
                <PlusOutlined className="icon-add" /> Tạo Mới
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
                  <BtnOkStyledTask onClick={handleCreateNewColumn}>Tạo</BtnOkStyledTask>
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
