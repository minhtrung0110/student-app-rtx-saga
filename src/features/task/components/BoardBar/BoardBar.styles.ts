import styled from 'styled-components';
import { THEME } from '../../../../constants';

const divideMixin = `
  content: '';
  position: absolute;
  border: 1.5px solid var(--white);
  right: -14px;
  height: 1.8rem;
`;
export const NavbarBoardStyled = styled.div`
  height: 3.2rem;
  padding: 0 calc(2 * 10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.13);
  font-size: 1rem;

  .board-name {
    color: ${THEME?.token?.light};
  }

  .board-view {
    .board-name {
      color: ${THEME?.token?.light};
      display: flex;
      align-items: center;

      .icon {
        margin-right: 0.5rem;
        font-size: 1.25rem;
        padding: 0;
      }
    }
  }

  .board-filter {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .sprint-name {
      height: 2rem;
      background-color: ${THEME?.token?.light};
      padding: 1rem;
      border-radius: ${THEME?.token?.borderRadius};
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-right: 1.4rem;
      font-weight: bold;

      &:after {
        ${divideMixin};
        top: 0;
      }
    }

    .filter-btn {
      height: 2rem;
      background-color: ${THEME?.token?.light};
      padding: 1rem;
      border-radius: ${THEME?.token?.borderRadius};
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-right: 1.4rem;

      &:hover {
      }

      &:after {
        ${divideMixin}
      }

      .filter-task {
        font-weight: 450;
        display: flex;
        align-items: center;

        .icon {
          font-weight: 200;
          color: #81807f;
          font-size: var(--14px);
          margin-right: 0.5rem;
        }
      }
    }

    .search {
      position: relative;
      margin-right: 1.4rem;

      &:after {
        ${divideMixin};
        top: 0;
      }
    }

    .avatar-group {
      margin-right: 1.4rem;
      position: relative;
      display: flex;
      align-items: center;

      &:hover {
      }

      &:after {
        ${divideMixin}
      }
    }

    .action-project {
      height: 2rem;
      cursor: pointer;
      background-color: ${THEME?.token?.light};
      padding: 1rem;
      border-radius: ${THEME?.token?.borderRadius};
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-right: 1.4rem;

      &:hover {
      }

      &:after {
        ${divideMixin}
      }
    }

    .btn-more {
      line-height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: hsla(0deg, 0%, 100%, 0.24);
      border: none;
      padding: 0.4rem;
      color: var(--gray97-color);
      border-radius: 2px;
      margin-left: 5px;

      &:hover {
        background-color: hsla(0deg, 0%, 100%, 0.14);
      }
    }
  }
`;
