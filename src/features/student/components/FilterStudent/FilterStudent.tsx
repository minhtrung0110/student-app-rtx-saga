import React, { ChangeEvent, FC } from 'react';
import { Button, Select } from 'antd';
import { PlusCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { ListParams } from 'src/models';
import { globalNavigate } from 'src/components/commoms/GlobalHistory';
import { config } from 'src/config';
import {
  ActionStyled,
  BoxFilterActionStyled,
  FilterGroup,
  FilterStudentStyled,
  SearchStudent,
  TitleFilterGroup,
} from './FilterStudent.styles';

interface FilterStudentProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

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
    <FilterStudentStyled>
      <TitleFilterGroup>
        <UnorderedListOutlined className={'icon'} />
        <span className={'title'}>List Student</span>
      </TitleFilterGroup>
      <BoxFilterActionStyled>
        <FilterGroup>
          <SearchStudent placeholder="Enter search" onChange={handleSearch} allowClear />
          <Select
            className="filter"
            style={{ width: 140 }}
            onChange={handleFilter}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'in_active', label: 'In Active' },
              { value: 'all', label: 'All' },
            ]}
          />
        </FilterGroup>
        <ActionStyled>
          <Button icon={<PlusCircleOutlined />} onClick={handleCreateStudent}>
            Create Student
          </Button>
        </ActionStyled>
      </BoxFilterActionStyled>
    </FilterStudentStyled>
  );
};

export default FilterStudent;
