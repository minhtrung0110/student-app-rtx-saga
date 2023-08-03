// Libraries
import React, { FC } from 'react';
import styled from 'styled-components';

// Components
import TableStudent from 'src/features/student/components/TableStudent';
import FilterStudent from 'src/features/student/components/FilterStudent/FilterStudent';
import TableSkeleton from 'src/components/commoms/Skeleton/TableSkeleton';

// Models
import { ListParams } from 'src/models';

// Apis
// Hook - Actions
import {
  selectStudentFilter,
  selectStudentList,
  studentActions,
} from 'src/features/student/studentSlice';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useGetDataStudent } from '../studentQuery';

const ListPageStyled = styled.div`
  padding: 24px;
  margin: 12px;
`;
const ListStudentPage: FC = () => {
  const filter = useAppSelector(selectStudentFilter);
  // query
  const query = useGetDataStudent(filter);

  const dispatch = useAppDispatch();
  const studentList = useAppSelector(selectStudentList);

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };
  const handleDeleteStudent = async (id: string | number | boolean) => {
    try {
      dispatch(studentActions.removeStudent(id));
    } catch (err) {}
  };
  const updateState = id => {
    const newStudentList = studentList.filter(student => student.id !== id);
    console.log('List Mới:', newStudentList);
    dispatch(studentActions.fetchStudentListSuccess(newStudentList));
  };
  console.log('Filter:', filter);

  return (
    <ListPageStyled className={'student-page'}>
      <div className={'student-page-header'}>
        <FilterStudent filter={filter} onSearchChange={handleSearchChange} />
      </div>
      {!query.isLoading ? (
        <div className={'student-page-content'}>
          <TableStudent listStudent={query.data} onDelete={handleDeleteStudent} />
        </div>
      ) : (
        <TableSkeleton />
      )}
    </ListPageStyled>
  );
};

export default ListStudentPage;
