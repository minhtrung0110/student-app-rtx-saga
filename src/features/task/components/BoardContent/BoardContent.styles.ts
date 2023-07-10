import styled from 'styled-components';
import { THEME } from '../../../../constants';

export const Container = styled.div`
  height: 100%;
  flex-direction: column;
  overflow-x: scroll;
  font-family: sans-serif;
`;

export const Lists = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 40px;
`;

export const BoxNewColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  min-width: 240px;
  //background-color: rgba(255, 255, 255, 0.38);
  line-height: 40px;
  padding: 4px 10px;
  margin-top: 2px;
  margin-left: 15px;
  border-radius: 0.3rem;

  .btn-add-column {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 350px;
    min-width: 240px;
    height: 45px;
    line-height: 40px;
    padding: 4px 0 4px 15px;
    color: ${THEME.token.dark50};
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: hsla(0, 0%, 100%, 0.24);
    border-radius: 0.3rem;

    &:hover {
      background-color: hsla(0, 0%, 100%, 0.14);
      cursor: pointer;
    }

    .icon-add {
      margin-right: 0.2rem;
    }
  }

  .input-enter-new-column {
    margin: 5px 0 10px 0;
    box-shadow: var(--bx-sh-task);
  }

  .ft-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.2rem;
  }
`;
