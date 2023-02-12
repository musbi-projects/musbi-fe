import type { SelectedOption } from './types';

import React, { useState, useCallback, useEffect } from 'react';
import { useSelect, useSelectKeydown } from './hooks';
import { useEscClose, useOutsideClick } from '@/hooks';
import { useTheme } from 'styled-components';

import styled from 'styled-components';

import SelectProvider from './SelectProvider';
import Text from '../Text';
import { MdOutlineArrowDropDown } from 'react-icons/md';

interface SelectProps {
  children: React.ReactElement[];
  onChange: ({ id, value }: SelectedOption) => void;
  placeholder?: string;
  trigger?: 'click' | 'hover';
  defaultValue?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  height?: React.CSSProperties['height'];
}

export default function Select({
  children,
  trigger = 'click',
  defaultValue,
  disabled,
  placeholder,
  icon,
  height,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseSelect = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEscClose(() => setIsOpen(false));
  const { ref } = useOutsideClick(() => setIsOpen(false));
  const { value, selectedOption, handleClickSelectOption, filteredChildren, handleChange } = useSelect({
    children,
    isOpen,
    handleCloseSelect,
  });
  const targetIndex = useSelectKeydown({ handleClick: handleClickSelectOption, length: filteredChildren?.length });
  const theme = useTheme();

  useEffect(() => {
    if (selectedOption) {
      onChange(selectedOption);
    }
  }, [selectedOption]);

  return (
    <SelectProvider
      handleClickSelectOption={handleClickSelectOption}
      targetIndex={targetIndex}
      selectedOption={selectedOption}
    >
      <StyledSelectContainer
        onClick={(e) => trigger === 'click' && setIsOpen(true)}
        onMouseEnter={() => trigger === 'hover' && setIsOpen(true)}
        onMouseLeave={() => trigger === 'hover' && setIsOpen(false)}
        ref={ref}
      >
        {isOpen && <StyledInput value={value} onChange={handleChange} placeholder={placeholder}></StyledInput>}
        {!isOpen && (
          <Text as='p' size={theme.font.body.medium} color='black'>
            {selectedOption.value || defaultValue}
          </Text>
        )}

        <StyledIconsWrapper>
          {icon}
          <MdOutlineArrowDropDown />
        </StyledIconsWrapper>

        {isOpen && (
          <StyledOptionList onClick={(e) => e.stopPropagation()} height={height}>
            {filteredChildren}
          </StyledOptionList>
        )}
      </StyledSelectContainer>
    </SelectProvider>
  );
}

const StyledSelectContainer = styled.div`
  position: relative;
  border: 1px solid lightgray; // TODO: 컬러 바꾸기
  border-radius: 4px;
  background-color: #fff;

  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  padding: 8px 16px;


  p {
    flex-grow: 1;
  }
`;

const StyledIconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
`;

const StyledOptionList = styled.ul<{ height: React.CSSProperties['height'] }>`
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
  width: 100%;
  height: fit-content;
  max-height: ${({ height }) => height || '300px'};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3);
`;

const StyledInput = styled.input`
  flex-grow: 1;
  outline: none;
  border: none;
  position: relative;
  font-size: ${({ theme }) => theme.font.body.medium};
`;
