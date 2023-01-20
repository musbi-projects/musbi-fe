import React from "react";
import { HEADER_HEIGHT } from "@/constants";
import styled, { css } from "styled-components";

interface HeaderProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const Header = ({ left, right }: HeaderProps) => {
  return (
    <StyledHeader>
      <div className="header-left">{left}</div>
      <div className="header-right">{right}</div>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 18px 48px;
    height: ${HEADER_HEIGHT}px;
    border-bottom: 1px solid ${theme.color.border};
  `}
`;
