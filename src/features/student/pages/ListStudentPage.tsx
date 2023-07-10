import React, { FC, useEffect } from 'react';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  studentActions,
} from '../studentSlice';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import TableStudent from '../components/TableStudent';
import FilterStudent from '../components/FilterStudent/FilterStudent';
import TableSkeleton from 'src/components/commoms/Skeleton/TableSkeleton';
import { ListParams } from 'src/models';
import studentApi from 'src/api/studentApi';
import styled from 'styled-components';

const ListPageStyled = styled.div`
  padding: 24px;
  margin: 12px;
`;
const ListStudentPage: FC = () => {
  const dispatch = useAppDispatch();
  const studentList = useAppSelector(selectStudentList);
  //  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };
  const handleDeleteStudent = async (id: string | number | boolean) => {
    try {
      await studentApi.remove(id);
      updateState(id);
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
      {!loading ? (
        <div className={'student-page-content'}>
          <TableStudent listStudent={studentList} onDelete={handleDeleteStudent} />
        </div>
      ) : (
        <TableSkeleton />
      )}
    </ListPageStyled>
  );
};

export default ListStudentPage;
