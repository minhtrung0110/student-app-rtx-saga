import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Student } from '../../../models';
import studentApi from '../../../api/studentApi';
import { notification } from 'antd';
import FormStudent from '../components/FormStudent';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import TableSkeleton from '../../../components/commoms/Skeleton/TableSkeleton';
import styled from 'styled-components';
import { THEME } from '../../../constants';
import { selectStudentList, studentActions } from '../studentSlice';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const FormPage = styled.div`
  margin: 40px;
  box-shadow: 1px 2px ${THEME.token.gray80Color};
  background-color: #fff;
  padding: ${THEME.token.pdContent} calc(2 * ${THEME.token.pdContent});
  border-radius: calc(2 * ${THEME.token.borderRadius});
`;
const FormStudentPage: FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const openNotificationWithIcon = (type: NotificationType, message, description, duration) => {
    api[type]({
      message,
      description,
      duration,
    });
  };
  const studentList = useAppSelector(selectStudentList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!studentId) return;

    // IFFE
    (async () => {
      setLoading(true);
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log('Failed to fetch student details', error);
      }
    })();
  }, [studentId]);
  // console.log('Student Default:', student);
  const handleUpdateState = (type, data) => {
    if (type === 'create') {
      //studentList.push(data);
      //console.log('List of students Updated:', studentList);
      //   dispatch(studentActions.fetchStudentListSuccess(studentList));
    } else {
      const newStudentList = studentList.map(student => (student.id === data.id ? data : student));
      console.log('List of students Updated:', newStudentList);
      dispatch(studentActions.fetchStudentListSuccess(newStudentList));
    }
  };
  const handleFormSubmit = async (data: Student) => {
    //console.log('Submit:', data, isEdit);
    let isSuccess = false;

    try {
      if (isEdit) {
        await studentApi.update({ id: studentId, ...data });
        handleUpdateState('update', { id: studentId, ...data });
        openNotificationWithIcon('success', 'Update Student Success', 'Data is saved', 1.4);
      } else {
        await studentApi.add(data);
        handleUpdateState('create', { id: 10, ...data });
        openNotificationWithIcon('success', 'Create Student Success', 'Data is saved', 1.4);
      }
      isSuccess = true;
    } catch (error: any) {
      openNotificationWithIcon(
        'error',
        isEdit ? 'Update Student Fail' : 'Create Student Fail',
        error.message,
        1.5,
      );
    }

    if (isSuccess) {
      //globalNavigate(config.routes.list_student);
    }
  };
  return (
    <FormPage>
      {contextHolder}
      <div className="header"></div>
      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="form-group">
          <FormStudent
            onSubmit={handleFormSubmit}
            dataStudent={student}
            type={isEdit ? 'update' : 'create'}
          />
        </div>
      )}
    </FormPage>
  );
};

export default FormStudentPage;
