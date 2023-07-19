import styled from 'styled-components';
import { THEME } from '../../../../constants';
import { Col } from 'antd';

export const ButtonSubmit = styled.button`
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
export const ButtonCancel = styled.button`
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
export const FooterForm = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 3rem;
`;
export const HeaderForm = styled(Col)`
  display: flex;
  justify-content: center;
  align-content: center;
  height: 2.4rem;
  border-radius: ${THEME?.token?.borderRadius};
  color: ${THEME?.token?.white};
  font-weight: bold;
  background-color: ${THEME?.token?.primaryColor};
  margin-bottom: 3.5rem;

  .title {
    line-height: 2.4rem;
  }
`;
