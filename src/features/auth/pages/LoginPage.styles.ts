import tw from 'twin.macro';
import styled from 'styled-components';

export const MainContainerWrapper = styled.main`
  ${tw`w-full h-screen flex flex-col items-center justify-center px-4`}
`;

export const MaxWidthContainer = styled.div`
  ${tw`max-w-sm w-full text-gray-600 space-y-5`}
`;

export const HeaderForm = styled.div`
  ${tw`text-center pb-8`}
`;

export const LogoImage = styled.img`
  ${tw`mx-auto`}
`;

export const TitleHeader = styled.h3`
  ${tw`text-gray-800 text-2xl font-bold sm:text-3xl`}
`;

export const FormContainer = styled.form`
  ${tw`space-y-5`}
`;

export const Input = styled.input`
  ${tw`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg`}
`;

export const RememberMeContainer = styled.div`
  ${tw`flex items-center justify-between text-sm`}
`;

export const RememberMeLabel = styled.label`
  ${tw`font-medium`}
`;

export const CheckboxInput = styled.input.attrs({ type: 'checkbox', className: 'peer' })`
  ${tw`hidden`}
`;

export const CheckboxLabel = styled.label`
  ${tw`relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45`}
`;

export const ForgotPasswordLink = styled.a`
  ${tw`text-center text-indigo-600 hover:text-indigo-500`}
`;

export const SubmitButton = styled.button`
  ${tw`w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150`}
`;

export const SocialButton = styled.button`
  ${tw`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100`}
`;

export const GoogleIcon = styled.svg`
  ${tw`w-5 h-5`}
`;

export const SignUpLink = styled.p`
  ${tw`text-center`}
`;

export const SignUpLinkText = styled.a`
  ${tw`font-medium text-indigo-600 hover:text-indigo-500`}
`;
