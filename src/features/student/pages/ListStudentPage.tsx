import React, { FC, useEffect } from 'react';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  studentActions,
} from '../studentSlice';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import TableStudent from '../components/TableStudent';
import FilterStudent from '../components/FilterStudent';
import TableSkeleton from 'src/components/commoms/Skeleton/TableSkeleton';
import { ListParams } from '../../../models';
import studentApi from '../../../api/studentApi';

const ListStudentPage: FC = () => {
  const dispatch = useAppDispatch();
  const studentList = useAppSelector(selectStudentList);
  //  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);
  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
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
    <div className={'student-page'}>
      <div className={'student-page-header'}>
        <FilterStudent filter={filter} onSearchChange={handleFilterChange} />
      </div>
      {!loading ? (
        <div className={'student-page-content'}>
          <TableStudent listStudent={studentList} onDelete={handleDeleteStudent} />
        </div>
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
};

export default ListStudentPage;
