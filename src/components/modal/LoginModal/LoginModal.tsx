import type { ModalHandler } from '@/types/common';
import type { AuthModalType } from '@/components/header/HeaderRight';
import type { LoginForm } from './types';

import { useCallback, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/share/schema';

import Image from 'next/image';
import Text from '@/components/Text';
import Stack from '@/components/Stack';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ModalContainer from '@/components/modal/ModalContainer';

import { MdOutlineArrowForwardIos } from 'react-icons/md';

import styled, { css } from 'styled-components';
import { getAssets } from '@/share/utils';

interface Props {
  isOpen: boolean;
  handler: ModalHandler<AuthModalType>;
}

const LoginModal = ({ isOpen, handler }: Props) => {
  const defaultValues = useMemo(() => {
    return {
      username: '',
      password: '',
    };
  }, []);
  const { font } = useTheme();
  const { register, handleSubmit, reset } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const onSubmit = useCallback((data: LoginForm) => {
    console.log(data);
  }, []);

  return (
    <ModalContainer isOpen={isOpen} handleCloseModal={handler.login.close}>
      <LoginModalContainer>
        <Stack direction='column' spacing={80} aligns={['center', 'start']}>
          <Image
            width={82 * 1.5}
            height={22 * 1.5}
            alt='무료 모바일 청첩장 메이커:: 무스비'
            src={getAssets('/images/common/logo_black.png')}
          />
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Stack direction='column' spacing={40}>
              <Stack direction='column' spacing={40}>
                <Input {...register('username')} type='text' placeholder='아이디' />
                <Input {...register('password')} type='text' placeholder='비밀번호' />
              </Stack>
              <Button
                size='large'
                shape='circle'
                variant='filled'
                onClick={() => {}}
                color='secondary'
                width={'100%'}
                weight='500'
              >
                로그인
              </Button>
              <Stack direction='column' spacing={16}>
                <Stack aligns={['center', 'center']} spacing={8}>
                  <StyledDivider></StyledDivider>
                  <Text as={'span'} color='lightGray' size={font.body.small}>
                    다른 방법으로 로그인
                  </Text>
                  <StyledDivider></StyledDivider>
                </Stack>
                <Stack aligns={['start', 'center']} spacing={24}>
                  <Button size='small' shape='circle' variant='text' onClick={() => {}} color='secondary' weight='500'>
                    구글
                  </Button>
                  <Button size='small' shape='circle' variant='text' onClick={() => {}} color='secondary' weight='500'>
                    카카오
                  </Button>
                  <Button size='small' shape='circle' variant='text' onClick={() => {}} color='secondary' weight='500'>
                    네이버
                  </Button>
                </Stack>
              </Stack>
              <Stack direction='column' aligns={['center', 'start']} spacing={8}>
                <Stack aligns={['center', 'center']}>
                  <Text as={'span'} color='deepGray' size={font.body.small}>
                    아직 회원이 아니신가요?
                  </Text>
                  <Button
                    size='small'
                    shape='circle'
                    variant='text'
                    onClick={(e) => {
                      e.preventDefault();
                      reset(defaultValues);
                      handler.login.close();
                      handler.join.open();
                    }}
                    color='secondary'
                    weight='500'
                  >
                    회원가입 하기
                  </Button>
                </Stack>
                <Button
                  size='small'
                  shape='circle'
                  variant='text'
                  onClick={() => {}}
                  color='lightGray'
                  rightIcon={<MdOutlineArrowForwardIos />}
                >
                  비밀번호를 잊어버렸어요
                </Button>
              </Stack>
            </Stack>
          </StyledForm>
        </Stack>
      </LoginModalContainer>
    </ModalContainer>
  );
};

export default LoginModal;

const LoginModalContainer = styled.article`
    ${() => css`
      position: absolute;
      border-radius: 8px;
      width: 420px;
      top: 50%;
      left: 50%;
      z-index: 2000;
      padding: 35px 65px;
      background-color: #fff;
      transform: translate(-50%, -50%);
    `}
`;

const StyledDivider = styled.span`
  flex-grow: 1;
  height: 1px;
  background-color:  ${({ theme }) => theme.color.border};
`;

const StyledForm = styled.form`
  width: 100%;
`;
