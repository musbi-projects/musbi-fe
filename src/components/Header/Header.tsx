import React from "react";
import styled from "styled-components";

export interface HeaderProps {
  left: React.ReactNode | React.ReactNode[];
  right: React.ReactNode | React.ReactNode[];
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
  display: flex;
  justify-content: space-between;
  padding: 18px 48px;
  height: 76px;
`;
