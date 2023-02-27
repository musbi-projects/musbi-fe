import type { JoinForm } from '@/components/modal/JoinModal';
import type { ModalHandler } from '@/types/common';
import type { AuthModalType } from '@/components/header/HeaderRight';

import { useCallback, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { joinSchema } from '@/share/schema';

import Image from 'next/image';
import Text from '@/components/Text';
import Stack from '@/components/Stack';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ModalContainer from '@/components/modal/ModalContainer';

import styled, { css } from 'styled-components';
import { getAssets } from '@/share/utils';

interface Props {
  isOpen: boolean;
  handler: ModalHandler<AuthModalType>;
}

const JoinModal = ({ isOpen, handler }: Props) => {
  const defaultValues = useMemo(() => {
    return {
      username: '',
      password: '',
      passwordCheck: '',
      name: '',
      email: '',
    };
  }, []);
  const { font } = useTheme();
  const { register, handleSubmit, reset } = useForm<JoinForm>({
    resolver: yupResolver(joinSchema),
    defaultValues,
  });

  const onSubmit = useCallback((data: JoinForm) => {
    console.log(data);
  }, []);

  return (
    <ModalContainer isOpen={isOpen} handleCloseModal={handler.join.close}>
      <JoinModalContainer>
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
                <Input {...register('passwordCheck')} type='text' placeholder='비밀번호 확인' />
                <Input {...register('name')} type='text' placeholder='이름' />
                <Input {...register('email')} type='text' placeholder='이메일' />
              </Stack>
              <Button
                size='large'
                shape='circle'
                variant='filled'
                onClick={() => console.log('ddd')}
                color='secondary'
                width={'100%'}
                weight='500'
                type='button'
              >
                회원가입
              </Button>
              <Stack aligns={['center', 'center']}>
                <Text as={'span'} color='deepGray' size={font.body.small}>
                  이미 회원이신가요?
                </Text>
                <Button
                  size='small'
                  shape='circle'
                  variant='text'
                  onClick={(e) => {
                    e.preventDefault();
                    reset(defaultValues);
                    handler.join.close();
                    handler.login.open();
                  }}
                  color='secondary'
                  weight='500'
                >
                  로그인 하기
                </Button>
              </Stack>
            </Stack>
          </StyledForm>
        </Stack>
      </JoinModalContainer>
    </ModalContainer>
  );
};

export default JoinModal;

const JoinModalContainer = styled.article`
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

const StyledForm = styled.form`
  width: 100%;
`;
