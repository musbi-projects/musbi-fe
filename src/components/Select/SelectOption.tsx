import styled from "styled-components";

import { Text } from "../Text";

interface SelectOptionProps {
  id: string;
  index: number;
  children: React.ReactNode;
}

export default function SelectOption({ id, index, children }: SelectOptionProps) {
  return (
    <StyledLi id={id}>
      <Text as='p' size='16px' color='black'>
        {children}
      </Text>
    </StyledLi>
  );
}

const StyledLi = styled.li`
  background-color: #FFF;
  padding: 4px 8px;

  :hover {
    background-color: ${({ theme }) => theme.color.lightGray};
    cursor: pointer;
  }

`;
