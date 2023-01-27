import React, { useState, Children, cloneElement, isValidElement, useCallback } from "react";

import { useSelect, useSelectKeydown } from "./hooks";
import { useEscClose, useOutsideClickClose } from "@/hooks";

import styled from "styled-components";

import SelectProvider from "./SelectProvider";
import { Text } from "../Text";
import { MdOutlineArrowDropDown, MdOutlineKeyboardArrowDown } from "react-icons/md";

interface SelectProps {
  children: React.ReactElement[];
  onChange: () => void;
  trigger?: "click" | "hover";
  defaultValue?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  height?: React.CSSProperties["height"];
}

export default function Select({ children, trigger = "click", defaultValue, disabled, icon, height }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseSelect = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEscClose(() => setIsOpen(false));
  const { ref } = useOutsideClickClose(() => setIsOpen(false));
  const { currentValue, handleClickSelectOption, filteredChildren, handleChange } = useSelect({
    children,
    handleCloseSelect,
  });
  const { hoverIndex } = useSelectKeydown({ handleClick: handleClickSelectOption, length: filteredChildren?.length });

  console.log(currentValue);
  console.log(isOpen);

  return (
    <SelectProvider handleClickSelectOption={handleClickSelectOption} hoverIndex={hoverIndex}>
      <StyledSelectContainer
        onClick={(e) => trigger === "click" && setIsOpen(true)}
        onMouseEnter={() => trigger === "hover" && setIsOpen(true)}
        onMouseLeave={() => trigger === "hover" && setIsOpen(false)}
        ref={ref}
      >
        {isOpen ? (
          <StyledInput onChange={handleChange}></StyledInput>
        ) : (
          <Text as='p' size='16px' color='black'>
            {currentValue || defaultValue}
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

const StyledOptionList = styled.ul<{ height: React.CSSProperties["height"] }>`
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
  width: 100%;
  height: fit-content;
  max-height: ${({ height }) => height || "300px"};
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
`;
