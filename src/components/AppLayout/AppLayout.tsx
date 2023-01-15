import React from "react";
import styled from "styled-components";

interface AppLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <StyledLayout>
      <StyledContainer>{children}</StyledContainer>
    </StyledLayout>
  );
};

export default AppLayout;

const StyledLayout = styled.div`
  width: 100%;
  height: 100vh;
`;

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1920px;
  margin: 0 auto;
`;
