import { useTheme } from 'styled-components';

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
  handleCloseModal: () => void;
}

const JoinModal = ({ isOpen, handleCloseModal }: Props) => {
  const { font } = useTheme();

  return (
    <ModalContainer isOpen={isOpen} handleCloseModal={handleCloseModal}>
      <JoinModalContainer>
        <Stack direction='column' spacing={80} aligns={['center', 'start']}>
          <Image
            width={82 * 1.5}
            height={22 * 1.5}
            alt='무료 모바일 청첩장 메이커:: 무스비'
            src={getAssets('/images/common/logo_black.png')}
          />
          <Stack direction='column' spacing={40}>
            <Stack direction='column' spacing={40}>
              <Input type='text' name='username' placeholder='이름' />
              <Input type='text' name='email' placeholder='이메일' />
              <Input type='text' name='password' placeholder='비밀번호' />
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
              회원가입
            </Button>
            <Stack aligns={['center', 'center']}>
              <Text as={'span'} color='deepGray' size={font.body.small}>
                이미 회원이신가요?
              </Text>
              <Button size='small' shape='circle' variant='text' onClick={() => {}} color='secondary' weight='500'>
                로그인 하기
              </Button>
            </Stack>
          </Stack>
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
