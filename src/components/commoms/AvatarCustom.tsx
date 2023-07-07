import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { isEmpty } from 'lodash';
import styled from 'styled-components';

interface AvatarCustomProps {
  avatar: string | undefined;
  lastName: string | undefined;
  size?: 'large' | 'small' | 'default';
}

const AvatarCustom: React.FC<AvatarCustomProps> = ({
  avatar = 'http://',
  lastName = 'A',
  size = 'large',
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkImageUrl = (url: string) => {
      let img = document.createElement('img');
      img.src = url;
      img.onload = () => setShow(true);
      img.onerror = () => setShow(false);
    };
    checkImageUrl(avatar);
  }, [avatar]);

  const array = !isEmpty(lastName) ? lastName.split(' ') : [];
  const name = lastName.charAt(0);
  const BoxAvatar = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    cursor: pointer;
  `;
  return (
    <BoxAvatar className={'avatar-user'}>
      {show ? (
        <Avatar
          style={{ backgroundColor: '#1d81ab', verticalAlign: 'middle' }}
          size={size}
          src={avatar}
          className={'avatar'}
        />
      ) : (
        <Avatar
          style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
          size={size}
          className={'avatar'}
        >
          {name}
        </Avatar>
      )}
    </BoxAvatar>
  );
};

export default AvatarCustom;
