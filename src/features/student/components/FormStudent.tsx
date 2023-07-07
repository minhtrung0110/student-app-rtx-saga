import React, { FC } from 'react';
import dayjs from 'dayjs';
import { Student } from '../../../models';
import styled from 'styled-components';
import { Cascader, Col, DatePicker, Form, Input, Radio, Row } from 'antd';
import { THEME } from '../../../constants';
import { globalNavigate } from '../../../components/commoms/GlobalHistory';
import { config } from '../../../config';

interface FormStudentProps {
  dataStudent?: Student;
  onSubmit?: (formValues: Student) => void;
  type?: 'create' | 'update';
}

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const residences: Option[] = [
  {
    value: 'Hồ Chí Minh',
    label: 'Hồ Chí Minh',
    children: [
      {
        value: 'Bình Thạnh',
        label: 'Bình Thạnh',
        children: [
          {
            value: 'Phường 9',
            label: 'Phường 9',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const StyledForm = styled(Form)`
  padding: 2rem;
`;
const CustomForm = ({ onFinish, ...restProps }) => {
  return <StyledForm onFinish={onFinish} {...restProps} />;
};
const ButtonSubmit = styled.button`
  // display: flex;
  justify-content: center;
  align-content: center;
  border-radius: ${THEME?.token?.borderRadius};
  width: 4rem;
  height: 2.4rem;
  font-weight: bold;
  color: ${THEME?.token?.primaryColor};
  border: 1px solid ${THEME?.token?.primaryColor};
  background-color: ${THEME?.token?.white};
  cursor: pointer;
  margin: 0.5rem;

  &:hover {
    color: ${THEME?.token?.white};
    background-color: ${THEME?.token?.primaryColor};
  }
`;
const ButtonCancel = styled.button`
  // display: flex;
  justify-content: center;
  align-content: center;
  border-radius: ${THEME?.token?.borderRadius};
  width: 4rem;
  height: 2.4rem;
  font-weight: bold;
  color: ${THEME?.token?.red};
  border: 1px solid ${THEME?.token?.red};
  background-color: ${THEME?.token?.white};
  cursor: pointer;
  margin: 0.5rem;

  &:hover {
    color: ${THEME?.token?.white};
    background-color: ${THEME?.token?.red};
  }
`;
const FooterForm = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 3rem;
`;
const HeaderForm = styled(Col)`
  display: flex;
  justify-content: center;
  align-content: center;
  height: 2.4rem;
  border-radius: ${THEME?.token?.borderRadius};
  color: ${THEME?.token?.white};
  font-weight: bold;
  background-color: ${THEME?.token?.primaryColor};
  margin-bottom: 2.5rem;

  .title {
    line-height: 2.4rem;
  }
`;

const FormStudent: FC<FormStudentProps> = ({ dataStudent, onSubmit, type = 'create' }) => {
  console.log({
    first_name: dataStudent?.first_name,
    last_name: dataStudent?.last_name,
    birth_day: dayjs(dayjs(dataStudent?.birth_day).format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD'),
    address: '61612',
    phone: dataStudent?.phone,
    mail: dataStudent?.mail,
    gender: dataStudent?.gender,
    residence: '',
  });

  const handleCancel = () => {
    globalNavigate(config.routes.list_student);
  };
  const handleFormSubmit = async data => {
    const newStudent = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      birth_day: dayjs(data?.birth_day).format('YYYY-MM-DD'),
      gender: data?.gender,
      mail: data?.mail,
      phone: data?.phone,
      address: `${data?.address} , ${data?.residence} `,
      status: type === 'update' ? data?.status : true,
    };
    try {
      await onSubmit?.(newStudent);
    } catch (error: any) {}
  };
  return (
    <>
      <CustomForm
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        style={{ maxWidth: '100%' }}
        initialValues={{
          first_name: dataStudent?.first_name,
          last_name: dataStudent?.last_name,
          birth_day: dayjs(
            dayjs(dataStudent?.birth_day).format('YYYY-MM-DD HH:mm:ss'),
            'YYYY-MM-DD',
          ),
          address: dataStudent?.address?.split(',')[0],
          phone: dataStudent?.phone,
          mail: dataStudent?.mail,
          gender: dataStudent?.gender,
          residence: dataStudent?.address?.substring(dataStudent?.address?.indexOf(',') + 1).trim(),
          status: dataStudent?.status,
        }}
        onFinish={handleFormSubmit}
      >
        <Row className="basic-info">
          <HeaderForm className="col-title" xs={{ span: 24 }} lg={{ span: 24 }}>
            <span className="title">{`${
              type === 'create' ? 'Tạo' : 'Cập Nhật Mới Sinh Viên'
            }`}</span>
          </HeaderForm>
          <Col className="col-left" xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              label="Họ"
              name="first_name"
              hasFeedback
              rules={[{ required: true, message: 'Please input your first name' }]}
            >
              <Input size="middle" />
            </Form.Item>

            <Form.Item
              label="Tên"
              name="last_name"
              hasFeedback
              rules={[{ required: true, message: 'Please input your name' }]}
            >
              <Input size="middle" />
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="birth_day"
              hasFeedback
              rules={[{ required: true, message: 'Please input your birthday' }]}
            >
              <DatePicker format="YYYY-MM-DD" size="middle" placeholder={'Chọn ngày'} />
            </Form.Item>

            <Form.Item
              label="Giới tính"
              name="gender"
              hasFeedback
              rules={[{ required: true, message: 'Please input your gender' }]}
            >
              <Radio.Group>
                <Radio value={true}>Nam</Radio>
                <Radio value={false}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="E-mail"
              name="mail"
              hasFeedback
              rules={[
                { required: true, message: 'Please input your mail' },
                {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Your mail is invalid!',
                },
              ]}
            >
              <Input size="middle" />
            </Form.Item>
          </Col>

          <Col className="col-right" xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              label="Số điện thoại:"
              name="phone"
              hasFeedback
              rules={[
                { required: true, message: 'Please input your phone number' },
                {
                  pattern: /^(0\d{9})$/,
                  message: 'Your phone number is invalid!',
                },
              ]}
            >
              <Input
                style={{
                  width: '100%',
                }}
                size="middle"
                name=""
                className="ant-input-no-radius "
              />
            </Form.Item>
            <Form.Item
              label="Địa chỉ:"
              name="residence"
              hasFeedback
              rules={[{ required: true, message: 'Please input your residence' }]}
            >
              <Cascader options={residences} size="middle" />
            </Form.Item>
            <Form.Item
              label="Số nhà: "
              name="address"
              hasFeedback
              rules={[{ required: true, message: 'Please input your address' }]}
            >
              <Input size="middle" />
            </Form.Item>
            {type === 'update' && (
              <Form.Item
                label="Trạng Thái"
                name="status"
                hasFeedback
                rules={[{ required: true, message: 'Please input your status' }]}
              >
                <Radio.Group>
                  <Radio value={true}>Hoạt Động</Radio>
                  <Radio value={false}>Thôi Học</Radio>
                </Radio.Group>
              </Form.Item>
            )}
          </Col>
        </Row>
        <FooterForm>
          <ButtonCancel onClick={handleCancel}>Hủy</ButtonCancel>
          <ButtonSubmit type={'submit'}>Lưu</ButtonSubmit>
        </FooterForm>
      </CustomForm>
    </>
  );
};

export default FormStudent;
