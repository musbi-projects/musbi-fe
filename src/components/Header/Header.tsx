import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssets } from '@/share/utils';
import { HEADER_HEIGHT } from '@/constants';
import styled, { css } from 'styled-components';

interface HeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const Header = ({ left, right }: HeaderProps) => {
  return (
    <StyledHeaderContainer>
      <h1>
        <Link href='/'>
          <Image
            width={82}
            height={22}
            alt='무료 모바일 청첩장 메이커:: 무스비'
            src={getAssets('/images/common/logo_black.png')}
          />
        </Link>
      </h1>
      <StyledCustomContainer>
        <div className='header-left'>{left}</div>
        <div className='header-right'>{right}</div>
      </StyledCustomContainer>
    </StyledHeaderContainer>
  );
};

export default Header;

const StyledCustomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledHeaderContainer = styled.header`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    display: flex;
    padding: 18px 48px;
    height: ${HEADER_HEIGHT}px;
    border-bottom: 1px solid ${theme.color.border};
    z-index: 1000;
  `}
`;
