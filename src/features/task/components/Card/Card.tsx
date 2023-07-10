import React, { FC, useState } from 'react';
import {
  FooterTask,
  HeaderLeft,
  HeaderRight,
  HeaderTask,
  PriorityTag,
  SaveButton,
  TaskItem,
} from './Card.styles';
import GroupMember from '../../../../components/commoms/GroupMember';
import { listMembersForTask } from '../../../../utils/initTask';
import { EditOutlined } from '@ant-design/icons';

interface ICard {
  text: string;
  id: string;
  cardsDispatch: any;
}

export const Card: FC<ICard> = ({ text, id, cardsDispatch }) => {
  const [isEdit, setIsEdit] = useState(false);
  const onDeleteClick = () => {
    cardsDispatch({ type: 'REMOVE', payload: { id } });
  };

  const onEditClick = (evt: any, id: string) => {
    setIsEdit(true);
  };

  const handleNameChange = (evt: any) => {
    const { value } = evt.target;
    cardsDispatch({
      type: 'EDIT',
      payload: { id, editValue: value },
    });
  };
  return (
    <TaskItem>
      <HeaderTask>
        <HeaderLeft>
          {isEdit ? (
            <input
              className={'input-title'}
              type="text"
              defaultValue={text}
              onChange={handleNameChange}
              onBlur={() => setIsEdit(false)}
              onKeyPress={evt => {
                if (evt.key === 'Enter') {
                  setIsEdit(false);
                }
              }}
            />
          ) : (
            text
          )}
        </HeaderLeft>
        <HeaderRight>
          {isEdit ? (
            <SaveButton onClick={() => setIsEdit(false)}>Save</SaveButton>
          ) : (
            <div className={'btn-edit'} onClick={evt => onEditClick(evt, id)}>
              <EditOutlined className={'icon'} />
            </div>
          )}
        </HeaderRight>
      </HeaderTask>
      <FooterTask>
        <div className="id">Id:iddad</div>
        <PriorityTag id={'highly'}>Highly</PriorityTag>
        <div className={'group-member'}>
          <GroupMember listMember={listMembersForTask} maxCount={2} size={'small'} showCount={2} />
        </div>
      </FooterTask>
    </TaskItem>
  );
};
