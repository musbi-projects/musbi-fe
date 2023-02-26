import type { ButtonProps } from '@/components/Button';
import type { HeaderMenu } from '@/components/header/HeaderRight';

import { useMemo } from 'react';
import { useModal } from '@/hooks/useModal';
import styled from 'styled-components';

import Button from '@/components/Button';
import JoinModal from '@/components/modal/JoinModal';
import LoginModal from '@/components/modal/LoginModal';

export default function HeaderRight() {
  const joinModal = useModal();
  const loginModal = useModal();

  const menuList: HeaderMenu[] = useMemo(
    () => [
      {
        label: '로그인',
        variant: 'text',
        onClick: loginModal.handleOpenModal,
      },
      {
        label: '회원가입',
        variant: 'outlined',
        onClick: joinModal.handleOpenModal,
      },
    ],
    [],
  );

  const commonButtonProps: Omit<ButtonProps, 'onClick' | 'variant'> = useMemo(() => {
    return {
      size: 'medium',
      shape: 'circle',
      color: 'secondary',
      weight: 400,
    };
  }, []);

  return (
    <>
      <StyledHeaderRightContainer>
        {menuList.map(({ label, variant, onClick }) => {
          return (
            <Button key={label} {...commonButtonProps} variant={variant} onClick={onClick}>
              {label}
            </Button>
          );
        })}
      </StyledHeaderRightContainer>

      <LoginModal isOpen={loginModal.isOpen} handleCloseModal={loginModal.handleCloseModal} />
      <JoinModal isOpen={joinModal.isOpen} handleCloseModal={joinModal.handleCloseModal} />
    </>
  );
}

const StyledHeaderRightContainer = styled.div`
  display: flex;
  column-gap: 4px;
  justify-content: flex-end;
`;
