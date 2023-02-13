import React from 'react';
import Image from 'next/image';
import Input from '@/components/Input';
import { useTextDrawer } from './hooks/useTextDrawer';
import styled from 'styled-components';

const TextDrawer = () => {
  const { textList, handleChangeSearchText, handleClickDrawerItem } = useTextDrawer();
  return (
    <StyledTextDrawerContainer>
      <Input
        type='search'
        name='keyword'
        variant='outlined'
        placeholder='검색'
        autoComplete='off'
        height='40px'
        mb='20px'
        autoFocus
        fullWidth
        onChange={handleChangeSearchText}
      />
      <StyledScrollContainer>
        <StyledTextList>
          {textList &&
            textList?.map((item, idx) => {
              const { thumbnail, fontFamily } = item;
              return (
                <StyledTextItem key={`text-item-${idx + 1}`} onClick={() => handleClickDrawerItem(item)}>
                  <Image src={thumbnail} alt={fontFamily} fill />
                </StyledTextItem>
              );
            })}
        </StyledTextList>
      </StyledScrollContainer>
    </StyledTextDrawerContainer>
  );
};

export default TextDrawer;

const StyledTextDrawerContainer = styled.div`
  padding: 28px 20px;
  height: 100%;
`;

const StyledScrollContainer = styled.div`
  width: calc(100% + 15px);
  height: calc(100% - 60px);
  padding-right: 15px;
  overflow: auto;
  overscroll-behavior: none;
`;

const StyledTextList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
`;

const StyledTextItem = styled.li`
  position: relative;
  width: calc(50% - 12px);
  height: 92px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 2px;
  
  &:hover {
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      box-shadow: inset 0 0 0 2px red;
    }
  }
`;
