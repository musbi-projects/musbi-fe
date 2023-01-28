import type { StyledSelectOptionProps } from "./types";

import { useState, useEffect, useMemo } from "react";
import { useSelectContext } from "./hooks";
import styled, {css} from "styled-components";

import Text from "../Text";

interface SelectOptionProps {
  id: string;
  index: number;
  value: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export default function SelectOption({ id, index, value, children, disabled = false }: SelectOptionProps) {
  const { handleClickSelectOption, targetIndex, currentValue } = useSelectContext();
  const [isHover, setIsHover] = useState(false);

  const selected = useMemo(() => {
    return currentValue === value;
  }, [value, currentValue])

  useEffect(() => {
    targetIndex === index ? setIsHover(true) : setIsHover(false);
  }, [targetIndex, index]);

  return (
    <StyledSelectOption
      id={id}
      onClick={() => !disabled && handleClickSelectOption?.(index)}
      onMouseEnter={() => !disabled && setIsHover(true)}
      onMouseLeave={() => !disabled && setIsHover(false)}
      isHover={isHover}
      disabled={disabled}
      selected={selected}
    >
      <Text as='p' size='16px' color='black'>
        {children || value}
      </Text>
    </StyledSelectOption>
  );
}

const StyledSelectOption = styled.li<StyledSelectOptionProps>`
  padding: 8px 16px;

  ${({disabled, isHover, selected, theme}) => {
    if (disabled) {
      return css`
        cursor: not-allowed;
        p {
          color: ${theme.color.lightGray};
        }
      `
    }

    if (selected) {
      return css`
        background-color: ${theme.color.secondary};
        cursor: pointer;
      `
    }

    if (isHover) {
      return css`
        background-color: ${theme.color.lightGray};
        cursor: pointer;
      `
    }

    return css`
      background-color: #FFF;
      cursor: pointer;
    `
  }}


`;
