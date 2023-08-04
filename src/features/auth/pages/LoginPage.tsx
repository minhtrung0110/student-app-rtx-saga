import React from 'react';
import { Form } from 'antd';
import { useAppDispatch } from '../../../app/hooks';
import { authActions } from '../authSlice';
import { setCookies } from '../../../api/authApi';
import styled from 'styled-components';
import { THEME } from '../../../constants';
import { globalNavigate } from '../../../components/commoms/GlobalHistory';
import { config } from '../../../config';
import {
  CenteredText,
  CheckboxInput,
  CheckboxLabel,
  ForgotPasswordLink,
  FormContainer,
  GoogleIcon,
  Input,
  LogoImage,
  MainContainer,
  MaxWidthContainer,
  RememberMeContainer,
  RememberMeLabel,
  SignUpLink,
  SignUpLinkText,
  SocialButton,
  SubmitButton,
  Title,
} from './LoginPage.styles';

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
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      dispatch(
        authActions.loginSuccess({
          id: 1,
          mail: 'Easy Frontend',
          password: '154',
        }),
      ),
        globalNavigate(config.routes.tasks);
    }, 500);
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
    <MainContainer>
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <MaxWidthContainer>
        <CenteredText>
          <LogoImage src="https://floatui.com/logo.svg" width={150} />
          <div className="mt-5">
            <Title>Log in to your account</Title>
          </div>
        </CenteredText>
        <FormContainer onSubmit={e => e.preventDefault()}>
          <div>
            <label className="font-medium">Email</label>
            <Input type="email" required />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <Input type="password" required />
          </div>
          <RememberMeContainer>
            <div className="flex items-center gap-x-3">
              <CheckboxInput
                type="checkbox"
                id="remember-me-checkbox"
                className="checkbox-item peer hidden"
              />
              <CheckboxLabel htmlFor="remember-me-checkbox" />
              <RememberMeLabel>Remember me</RememberMeLabel>
            </div>
            <ForgotPasswordLink href="javascript:void(0)">Forgot password?</ForgotPasswordLink>
          </RememberMeContainer>
          <SubmitButton>Sign in</SubmitButton>
        </FormContainer>
        <SocialButton>
          <GoogleIcon viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* SVG paths go here */}
          </GoogleIcon>
          Continue with Google
        </SocialButton>
        <SignUpLink>
          Don't have an account? <SignUpLinkText href="javascript:void(0)">Sign up</SignUpLinkText>
        </SignUpLink>
      </MaxWidthContainer>
    </MainContainer>
  );
};

export default LoginPage;
