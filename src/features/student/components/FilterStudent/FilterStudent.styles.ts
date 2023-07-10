import styled from 'styled-components';
import { THEME } from '../../../../constants';
import { Input } from 'antd';

export const FilterStudentStyled = styled.div`
  height: 6rem;
  margin: 0rem;
`;
export const TitleFilterGroup = styled.div`
  width: 100%;
  height: 2rem;
  margin: 0.5rem 0;
  display: flex;
  align-content: center;

  .icon {
    font-size: ${THEME?.token?.size22};
    font-weight: 700;
    margin-right: 0.5rem;
  }

  .title {
    font-size: ${THEME?.token?.size16};
    font-weight: 700;
  }
`;
export const BoxFilterActionStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;
export const FilterGroup = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;

  .filter {
    margin: 0 2rem;
  }
`;
export const SearchStudent = styled(Input)`
  color: ${THEME?.token?.primaryColor};
  height: 2rem;
  width: 18rem;

  .ant-input {
    background-color: #f8f8f8;
    border-color: #d9d9d9;
    color: #333333;
    font-weight: bold;
  }

  .ant-input:hover,
  .ant-input:focus {
    border-color: ${THEME?.token?.primaryColor};
  }

  .ant-btn-primary {
    background-color: ${THEME?.token?.primaryColor};
    border-color: ${THEME?.token?.primaryColor};
    color: #ffffff;
  }

  .ant-btn-primary:hover,
  .ant-btn-primary:focus {
    background-color: ${THEME?.token?.primaryColor};
    border-color: ${THEME?.token?.primaryColor};
  }
`;
export const ActionStyled = styled.div``;
