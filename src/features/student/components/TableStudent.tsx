import React, { FC, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DataTableStudentType, Student } from 'src/models';
import styled from 'styled-components';
import AvatarCustom from '../../../components/commoms/AvatarCustom';
import { globalNavigate } from '../../../components/commoms/GlobalHistory';
import { config } from '../../../config';
import ConfirmModal from '../../../components/commoms/ConfirmModal';

interface TableStudentProps {
  listStudent: Student[];
  onDelete?: (id: string | number | boolean) => void;
}

const ContactTagStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .tag-item {
    margin: 0.2rem 0;
  }
`;
const TableStudent: FC<TableStudentProps> = ({ listStudent, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState<string | number | boolean>(false);
  const handleShowConfirm = id => {
    setShowConfirm(id);
  };
  const handleHiddenConfirm = () => {
    setShowConfirm(false);
  };
  const handleConfirmDeleteStudent = (showConfirm: string | number | boolean) => {
    console.log('Xóa:', showConfirm);
    if (onDelete) {
      onDelete(showConfirm);
      setShowConfirm(false);
    }
  };
  const ContactTag = ({ phone, mail, gender }) => (
    <ContactTagStyled className="contact-tag">
      <Tag color="volcano" className="tag-item phone-number">
        {phone}
      </Tag>
      <Tag color="blue" className="tag-item mail">
        {mail}
      </Tag>
      <Tag color={gender === 'female' ? 'magenta' : 'green'} className="tag-item gender">
        {gender}
      </Tag>
    </ContactTagStyled>
  );
  const columns: ColumnsType<DataTableStudentType> = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
    },
  ];

  const handleEditStudent = id => {
    globalNavigate(`${config.routes.list_student}/${id}`);
  };
  const data: DataTableStudentType[] = listStudent.map(student => ({
    avatar: <AvatarCustom avatar={student.avatar} lastName={student.last_name} size={'large'} />,
    full_name: `${student.first_name}  ${student.last_name}`,
    contact: (
      <ContactTag
        gender={`${student.gender ? 'male' : 'female'}`}
        mail={student.mail}
        phone={student.phone}
      />
    ),
    address: `${student.address}`,
    status: student.status ? (
      <Tag color="#55acee">Active</Tag>
    ) : (
      <Tag color="#cd201f">In Active</Tag>
    ),
    action: (
      <Space size="middle">
        <Button onClick={() => handleEditStudent(student.id)}>Update</Button>
        <Button danger onClick={() => handleShowConfirm(student.id)}>
          Delete
        </Button>
      </Space>
    ),
  }));
  return (
    <>
      <Table columns={columns} dataSource={data} />
      <ConfirmModal
        title={'Xóa Học Viên'}
        content={`Bạn Có Chắc Chắn Muốn Xóa Học Viên Này `}
        textCancel={'Hủy'}
        textOK={'Xóa'}
        onCancel={handleHiddenConfirm}
        onOK={() => handleConfirmDeleteStudent(showConfirm)}
        open={!!showConfirm}
      />
    </>
  );
};

export default TableStudent;
