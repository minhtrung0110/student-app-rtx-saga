// Libraries
import React, { FC, useState } from 'react';
import { isEmpty, isEqual } from 'lodash';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';

// Styles
import {
  FooterTask,
  HeaderLeft,
  HeaderRight,
  HeaderTask,
  PriorityTag,
  TaskItem,
  TextEdit,
} from './Card.styles';
import { MoreButton } from '../Column/Column.styles';

//Modules
import GroupMember from 'src/components/commoms/GroupMember';

// Models
import { Task } from 'src/models';

// Utils
import { generateRandomID } from 'src/utils/common';

const items = [
  {
    label: 'Edit',
    key: '1',
    icon: <EditOutlined />,
  },
  {
    label: 'Remove',
    key: '2',
    icon: <DeleteOutlined />,
    danger: true,
  },
];

interface ICard {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

const compareProps = (prev, next) => {
  console.log('Memo Card: ', isEqual(prev.task, next.task));
  return isEqual(prev.task, next.task);
};

export const Card: FC<ICard> = React.memo(({ task, onUpdate, onDelete }) => {
  const { _id, sort, priority, ...rest } = task;
  const members = task.assignee_user;
  const [title, setTitle] = useState<string>(task.title);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleUpdateTitle = () => {
    if (task.title !== title) {
      onUpdate({ ...task, title: title });
    }
    setIsEdit(false);
  };

  const handleMenuClick = e => {
    if (e.key === '1') {
      setIsEdit(true);
    } else if (e.key === '2') {
      onDelete(_id);
    } else {
    }
  };

  return (
    <TaskItem>
      <HeaderTask>
        <HeaderLeft>
          {!isEdit ? (
            <span className={'title'}>{title}</span>
          ) : (
            <TextEdit value={title} onChange={e => setTitle(e.target.value)} />
          )}
        </HeaderLeft>
        <HeaderRight>
          {isEdit ? (
            <div className={'btn-save'} onClick={handleUpdateTitle}>
              Save
            </div>
          ) : (
            <MoreButton
              className="dropdown-btn"
              menu={{
                items,
                onClick: handleMenuClick,
              }}
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
          )}
        </HeaderRight>
      </HeaderTask>
      <FooterTask>
        <div className="id">
          {!!_id ? _id.slice(_id.length - 6, _id.length - 1) : generateRandomID()}
          {`-${sort}`}
        </div>
        <PriorityTag id={priority.name.toLowerCase()}>{priority.name}</PriorityTag>
        <div className={'group-member'}>
          {!isEmpty(members) && (
            <GroupMember listMember={members} maxCount={2} size={'small'} showCount={2} />
          )}
        </div>
      </FooterTask>
    </TaskItem>
  );
}, compareProps);
