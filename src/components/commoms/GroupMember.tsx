import React, { FC } from 'react';
import { Avatar } from 'antd';
import AvatarCustom from './AvatarCustom';

interface GroupMemberProps {
  listMember: any;
  size?: 'large' | 'small' | 'default';
  maxCount: number;
  showCount: number;
}

const GroupMember: FC<GroupMemberProps> = ({
  listMember = [],
  size = 'default',
  maxCount = 3,
  showCount = 2,
}) => {
  const visibleMembers = listMember?.length > 0 ? listMember.slice(0, showCount) : [];
  return (
    <div>
      <Avatar.Group maxCount={maxCount} size={size}>
        {listMember.length > 0 &&
          visibleMembers.map(member => (
            <AvatarCustom
              key={member.id}
              avatar={member.avatar}
              lastName={member.last_name}
              size={size}
            />
          ))}
      </Avatar.Group>
    </div>
  );
};

export default GroupMember;
