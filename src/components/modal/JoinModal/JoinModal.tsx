import React, { useState } from 'react';

import Image from 'next/image';
import Input from '@/components/Input';
import ModalContainer from '../ModalContainer';
import styled, { css } from 'styled-components';
import { getAssets } from '@/share/utils';

interface Props {
  isOpen: boolean;
  handleCloseModal: () => void;
}

const JoinModal = ({ isOpen, handleCloseModal }: Props) => {
  return (
    <ModalContainer isOpen={isOpen} handleCloseModal={handleCloseModal}>
      <JoinModalContainer>
        <Image
          width={82 * 1.5}
          height={22 * 1.5}
          alt='무료 모바일 청첩장 메이커:: 무스비'
          src={getAssets('/images/common/logo_black.png')}
        />
        <div>
          <Input type='text' />
        </div>
        <div>buttons</div>
      </JoinModalContainer>
    </ModalContainer>
  );
};

export default JoinModal;

const JoinModalContainer = styled.article`
    ${() => css`
      position: absolute;
      border-radius: 8px;
      top: 50%;
      left: 50%;
      z-index: 2000;
      padding: 35px 65px;
      background-color: #fff;
      transform: translate(-50%, -50%);
    `}
`;
