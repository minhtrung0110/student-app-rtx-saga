// Libraries
import React, { FC, useState } from 'react';
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

// Components
import AvatarCustom from 'src/components/commoms/AvatarCustom';
import ConfirmModal from 'src/components/commoms/ConfirmModal';
import MailLink from 'src/components/commoms/MailLink';

// Models
import { DataTableStudentType, Student } from 'src/models';

// Constants
import { THEME } from 'src/constants';
import { globalNavigate } from 'src/components/commoms/GlobalHistory';
import { config } from 'src/config';

interface TableStudentProps {
  listStudent: Student[] | any;
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
      <MailLink email={mail} color={THEME.token.bsInfo} />
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
      align: 'center',
      width: '8%',
    },

    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      render: text => <strong>{text}</strong>,
      align: 'center',
      width: '15%',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      align: 'center',
      width: '20%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: text => <i>{text}</i>,
      align: 'center',
      width: '20%',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      width: '8%',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      width: '15%',
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
        <Tooltip placement="bottomLeft" title={'Edit'}>
          <Button
            icon={<EditFilled />}
            color={THEME.token.primaryColor}
            onClick={() => handleEditStudent(student.id)}
          />
        </Tooltip>
        <Tooltip placement="bottomRight" title={'Delete'}>
          <Button icon={<DeleteFilled />} danger onClick={() => handleShowConfirm(student.id)} />
        </Tooltip>
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
