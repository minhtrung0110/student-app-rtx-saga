import React, { FC, ReactNode } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import { THEME } from '../../constants';
import { WarningOutlined } from '@ant-design/icons';

interface ConfirmModalProps {
  open?: boolean;
  title?: string;
  content?: ReactNode;
  textCancel?: string;
  textOK?: string;
  onOK: any;
  onCancel: any;
}

const BoxConfimStyled = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
  width: 100%;

  .icon {
    font-size: 3rem;
    color: #f3d206;
    margin-right: 2rem;
    width: 7%;
  }

  .content {
    width: 80%;
    text-align: justify;
  }
`;
const ButtonSubmit = styled.button`
  // display: flex;
  justify-content: center;
  align-content: center;
  border-radius: ${THEME?.token?.borderRadius};
  width: 4rem;
  height: 2.4rem;
  font-weight: bold;
  color: ${THEME?.token?.primaryColor};
  border: 1px solid ${THEME?.token?.primaryColor};
  background-color: ${THEME?.token?.white};
  cursor: pointer;
  margin: 0.5rem;

  &:hover {
    color: ${THEME?.token?.white};
    background-color: ${THEME?.token?.primaryColor};
  }
`;
const ButtonCancel = styled.button`
  // display: flex;
  justify-content: center;
  align-content: center;
  border-radius: ${THEME?.token?.borderRadius};
  width: 4rem;
  height: 2.4rem;
  font-weight: bold;
  color: ${THEME?.token?.red};
  border: 1px solid ${THEME?.token?.red};
  background-color: ${THEME?.token?.white};
  cursor: pointer;
  margin: 0.5rem;

  &:hover {
    color: ${THEME?.token?.white};
    background-color: ${THEME?.token?.red};
  }
`;
const ConfirmModal: FC<ConfirmModalProps> = ({
  open = false,
  title,
  content,
  textCancel,
  textOK,
  onOK,
  onCancel,
}) => {
  return (
    <Modal
      title={title}
      open={open}
      centered
      cancelText="Hủy"
      className={'confirm-modal'}
      onCancel={onCancel}
      onOk={onOK}
      footer={[
        <ButtonCancel key="2" className={'btn-cancel'} onClick={onCancel}>
          {textCancel}
        </ButtonCancel>,
        <ButtonSubmit key="3" className={'btn-confirm'} onClick={onOK}>
          {textOK}
        </ButtonSubmit>,
      ]}
    >
      <BoxConfimStyled className={'box-confirmation'}>
        <WarningOutlined className={'icon'} />
        <span className={'content'}>{content}</span>
      </BoxConfimStyled>
    </Modal>
  );
};

export default ConfirmModal;
