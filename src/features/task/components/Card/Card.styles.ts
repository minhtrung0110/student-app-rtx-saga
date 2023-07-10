import styled from 'styled-components';
import { THEME } from '../../../../constants';
import { listPriority } from '../../../../utils/initTask';

export const TaskItem = styled.div`
  background: white;
  display: flex;
  justify-content: space-between;
  user-select: none;
  flex-direction: column;
`;
export const HeaderTask = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 2.2rem;
`;
export const HeaderLeft = styled.div`
  .input-title {
    margin: -5px -5px;
    height: 1.9rem;
    font-size: 14px;
    border: 1px solid ${THEME.token.gray80Color};
    border-radius: 3px;
  }
`;

export const HeaderRight = styled.div`
  .btn-edit {
    display: flex;
    align-content: center;
    justify-content: center;
    border-radius: 3px;
    padding: 0.4rem;
    width: 1.5rem;
    margin-top: -5px;

    .icon {
      color: ${THEME.token.gray80Color};
      font-size: 14px;
    }

    &:hover {
      background-color: ${THEME.token.informativeSecondary};

      .icon {
        color: ${THEME.token.gray40Color};
      }
    }
  }
`;

export const FooterTask = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 1.2rem;
  flex-wrap: wrap;

  .id {
    font-style: italic;
    font-size: ${THEME?.token?.size10};
  }
`;
export const PriorityTag = styled.div`
  width: 2.5rem;
  height: 1.2rem;
  border-radius: 0.2rem;
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 10px;
  font-style: italic;
  flex-wrap: wrap;
  ${({ id }) => {
    const priority = listPriority.find(item => item.value === id);
    if (priority) {
      return `
        color: ${priority.color};
        background-color: ${priority.backgroundColor};
     
      `;
    }
    // Mặc định nếu không tìm thấy ưu tiên trong mảng
    return `
      color: black;
      background-color: ${THEME.token.gray97Color};
    `;
  }}
`;
export const SaveButton = styled.button`
  background: ${THEME?.token?.primaryColor};
  border-radius: 3px;
  border: none;
  cursor: pointer;
  height: 1.5rem;
  color: white;

  :hover {
    background: ${THEME?.token?.secondaryColor};
  }
`;
