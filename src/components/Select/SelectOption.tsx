import { useState, useEffect } from "react";
import { useSelectContext } from "./hooks";
import styled from "styled-components";

import { Text } from "../Text";

interface SelectOptionProps {
  id: string;
  index: number;
  value: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export default function SelectOption({ id, index, value, children, disabled = false }: SelectOptionProps) {
  const { handleClickSelectOption, hoverIndex } = useSelectContext();
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    hoverIndex === index ? setIsHover(true) : setIsHover(false);
  }, [hoverIndex, index]);

  return (
    <StyledLi
      id={id}
      onClick={() => handleClickSelectOption?.(index)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      isHover={isHover}
    >
      <Text as='p' size='16px' color='black'>
        {children || value}
      </Text>
    </StyledLi>
  );
}

const StyledLi = styled.li<{ isHover: boolean }>`
  background-color:  ${({ theme, isHover }) => (isHover ? theme.color.lightGray : "#FFF")};
  padding: 8px 16px;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.color.lightGray};
    cursor: pointer;
  }

`;
