import styled from 'styled-components';
import { THEME } from './theme';

export const BtnCancelStyledTask = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  height: 1.8rem;
  font-size: ${THEME?.token?.size14};
  border-radius: ${THEME?.token?.borderRadius};
  background-color: ${THEME?.token?.light};
  flex-wrap: wrap;
  font-weight: bold;
  padding: 0 0.5rem;
  color: ${THEME?.token?.red};
  border: 1px solid ${THEME?.token?.red};

  &:hover {
    cursor: pointer;
    color: white;
    background-color: ${THEME?.token?.red};
  }
`;
export const BtnOkStyledTask = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  height: 1.8rem;
  font-size: ${THEME?.token?.size14};
  border-radius: ${THEME?.token?.borderRadius};
  background-color: ${THEME?.token?.light};
  font-weight: bold;
  flex-wrap: wrap;
  padding: 0 0.5rem;
  color: ${THEME?.token?.primaryColor};
  border: 1px solid ${THEME?.token?.primaryColor};

  &:hover {
    cursor: pointer;
    color: white;
    background-color: ${THEME?.token?.primaryColor};
  }
`;
