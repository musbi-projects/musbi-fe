import { useState } from "react";

import { useEscClose, useOutsideClickClose } from "@/hooks";

import styled from "styled-components";

import { MdOutlineArrowDropDown, MdOutlineKeyboardArrowDown } from "react-icons/md";

interface SelectProps {
  children: React.ReactNode;
  onChange: () => void;
  trigger?: "click" | "hover";
  defaultValue?: unknown;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function Select({ children, onChange, trigger = "click", defaultValue, disabled, icon }: SelectProps) {
  const [isOepn, setIsOpen] = useState(false);

  useEscClose(setIsOpen);
  const { ref } = useOutsideClickClose<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div style={{ position: "relative" }}>
      {!isOepn && (
        <StyledDiv
          onClick={() => trigger === "click" && setIsOpen(!isOepn)}
          onMouseEnter={() => trigger === "hover" && setIsOpen(true)}
          onMouseLeave={() => trigger === "hover" && setIsOpen(false)}
          ref={ref}
        >
          <Text as='p' size={"16px"} color='black'>
            value
          </Text>
          <MdOutlineKeyboardArrowDown />
          <MdOutlineArrowDropDown />
          <div></div>
        </StyledDiv>
      )}

      {isOepn && (
        <StyledSelectContainer
          onMouseEnter={() => trigger === "hover" && setIsOpen(true)}
          onMouseLeave={() => trigger === "hover" && setIsOpen(false)}
          ref={ref}
        >
          <div className='input-wrapper'>
            <StyledInput />
            {icon}
            <MdOutlineKeyboardArrowDown />
            <MdOutlineArrowDropDown />
          </div>
          <div className='divider'></div>

          <StyledUl>{children}</StyledUl>
        </StyledSelectContainer>
      )}
    </div>
  );
}

const _StyledSelectContainer = styled.div`
  position: relative;

`;

const StyledDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border: 1px solid lightgray; // TODO: 컬러 바꾸기
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
  background-color: #fff;
  padding: 4px 8px;

  p {
    flex-grow: 1;
  }
`;

const StyledUl = styled.ul`
  /* position: absolute;
  left: 0;
  top: 100%; */
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 4px 4px;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  outline: none;
  border: none;
`;

const StyledSelectContainer = styled.div`
  border: 1px solid lightgray; // TODO: 컬러 바꾸기
  border-radius: 4px;
  position: absolute;
  background-color: #fff;
  width: 100%;
  top: 0;
  left: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);;

  display: flex;
  flex-direction: column;

  .divider {
    height: 1px;
    background-color: ${({ theme }) => theme.color.lightGray};
  }


  .input-wrapper {
    display: flex;
    align-items: center;
    column-gap: 8px;
    padding: 4px 8px;
  }
`;
