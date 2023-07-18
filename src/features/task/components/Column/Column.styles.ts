import { THEME } from 'src/constants/theme';
import styled from 'styled-components';
import { Dropdown } from 'antd';

export const ContainerColumn = styled.div`
  min-width: 300px;
  padding: 8px 11px;
  box-sizing: border-box;
  border-radius: 5px;
  background: ${THEME.token.bgColumTask};
  width: 260px;
  min-height: 80px;
  max-height: 780px;
  flex: 0 0 auto;
  max-width: 350px;
  margin-left: 10px;
  overflow-y: auto;
  font-size: ${THEME.token.size16};
`;
export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
`;
export const Title = styled.div``;
export const MoreButton = styled(Dropdown)`
  height: 2.2rem - 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  color: #8d8d8d;
  cursor: pointer;
  font-weight: bold;
  border: none;
  letter-spacing: 1px;

  &:hover {
    background-color: rgba(132, 133, 131, 0.12);
    border-radius: 2px;
  }

  .dot {
    font-size: ${THEME.token.size16};
    font-weight: bold;
    padding: 0;
  }

  .overlay-more {
    padding: 0;
  }
`;
export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem; //var(--column-footer-height);
  .add-card-task {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 2rem;
    background-color: var(--color-text);
    width: 100%;
    font-size: ${THEME.token.size14};

    .footer-icon {
      color: ${THEME.token.gray60Color};
      margin-right: 0.5rem;
    }

    &:hover {
      cursor: pointer;
      background-color: rgb(213, 212, 212);
      border-radius: 3px
    }
`;
export const AreaAddTask = styled.div`
  display: flex;
  flex-direction: column;

  .input-enter-card {
    margin-bottom: 10px;
  }

  .gr-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
