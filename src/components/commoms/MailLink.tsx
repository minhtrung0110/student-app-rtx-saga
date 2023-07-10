import React from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';

interface MailLinkProps {
  email: string;
  color: string;
}

const StyledLink = styled(Tag)<{ color: string }>`
  cursor: pointer;
  background-color: #f8f8f8;
  border-color: ${({ color }) => color};
  color: ${({ color }) => color};
`;

const MailLink: React.FC<MailLinkProps> = ({ email, color }) => {
  const handleLinkClick = () => {
    const mailtoLink = `mailto:${email}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <StyledLink color={color} onClick={handleLinkClick}>
      {email}
    </StyledLink>
  );
};

export default MailLink;
