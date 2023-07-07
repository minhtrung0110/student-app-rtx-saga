import React from 'react';
import { Form, Input } from 'antd';
import { useAppDispatch } from '../../../app/hooks';
import { authActions } from '../authSlice';
import { setCookies } from '../../../api/authApi';
import styled from 'styled-components';
import { THEME } from '../../../constants';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleClickLogin = () => {
    console.log('Dispatch Login');
    setCookies('student-rtx', 'minhtrung4367@gmail.com', 4);
    dispatch(
      authActions.login({
        mail: 'minhtrung4367@gmail.com',
        password: '123456',
      }),
    );
  };
  const CenteredDiv = styled.div`
    margin-top: 8%;
    display: flex;
    justify-content: center;
  `;
  const FormLogin = styled(Form)`
    width: 60%;
    border: 1px solid ${THEME?.token?.primaryColor};
    padding: 2rem 1rem;
    border-radius: ${THEME?.token?.borderRadius};
  `;
  const ButtonLogin = styled.button`
    width: 3.5rem;
    height: 2.4rem;
    display: flex;
    justify-content: center;
    background-color: ${THEME?.token?.white};
    border: 1px solid ${THEME?.token?.primaryColor};
    align-items: center;
    color: ${THEME?.token?.primaryColor};
    border-radius: ${THEME?.token?.borderRadius};
    cursor: pointer;

    &:hover {
      color: ${THEME?.token?.white};
      font-weight: bold;
      background-color: ${THEME?.token?.primaryColor};
    }
  `;
  return (
    <CenteredDiv>
      <FormLogin
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleClickLogin}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <ButtonLogin type="submit">Login</ButtonLogin>
        </Form.Item>
      </FormLogin>
    </CenteredDiv>
  );
};

export default LoginPage;
