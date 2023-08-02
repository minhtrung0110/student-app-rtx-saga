import styled from 'styled-components';

export const Thread = styled.thead``;

export const InputStyled = styled.input`
  position: relative;
  display: inline-block;
  border-radius: 4px;
  background-color: #faf3dd;
  padding: 6px;
  border: 1px solid #eee;
  outline: none;
`;

export const ButtonRTStyled = styled.button`
  min-width: 30px;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 30px;
  cursor: pointer;
  margin-left: 0.5rem;
`;
export const PaginationStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;

export const FooterTableStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin: 1rem 0;
  padding: 1rem;
`;
export const TabFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  .title {
    font-weight: bold;
  }

  .content {
  }
`;
