import React, { ChangeEvent, FC } from 'react';
import { Button, Input, Select } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { THEME } from 'src/constants';
import { ListParams } from 'src/models';
import { globalNavigate } from '../../../components/commoms/GlobalHistory';
import { config } from '../../../config';

interface FilterStudentProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

const { Search } = Input;
const HeaderStudentTable = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 4rem;
`;
const FilterGroup = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;

  .filter {
    margin: 0 2rem;
  }
`;
const SearchStudent = styled(Search)`
  color: ${THEME?.token?.primaryColor};

  .ant-input {
    background-color: #f8f8f8;
    border-color: #d9d9d9;
    color: #333333;
  }

  .ant-input:hover,
  .ant-input:focus {
    border-color: ${THEME?.token?.primaryColor}f;
  }

  .ant-btn-primary {
    background-color: ${THEME?.token?.primaryColor};
    border-color: ${THEME?.token?.primaryColor}f;
    color: #ffffff;
  }

  .ant-btn-primary:hover,
  .ant-btn-primary:focus {
    background-color: ${THEME?.token?.primaryColor};
    border-color: ${THEME?.token?.primaryColor};
  }
`;
const FilterStudent: FC<FilterStudentProps> = ({ filter, onSearchChange }) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      search: e.target.value,
    };
    onSearchChange(newFilter);
  };
  const handleFilter = (value: string) => {
    if (!onSearchChange) return;
    let newFilter: ListParams;
    if (value !== 'all') {
      newFilter = {
        ...filter,
        status: value === 'active',
      };
    } else {
      newFilter = { ...filter };
      delete newFilter.status;
    }
    onSearchChange(newFilter);
  };
  const handleCreateStudent = () => {
    globalNavigate(config.routes.add_student);
  };
  return (
    <HeaderStudentTable className={'header-student-table'}>
      <FilterGroup>
        <SearchStudent placeholder="input search text" onChange={handleSearch} enterButton />
        <Select
          className="filter"
          style={{ width: 120 }}
          onChange={handleFilter}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'in_active', label: 'In Active' },
            { value: 'all', label: 'All' },
          ]}
        />
      </FilterGroup>
      <div className={'action-student'}>
        <Button icon={<PlusCircleOutlined />} onClick={handleCreateStudent}>
          Create Student
        </Button>
      </div>
    </HeaderStudentTable>
  );
};

export default FilterStudent;
