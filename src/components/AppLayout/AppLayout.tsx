import { HEADER_HEIGHT, TOOLBOX_WIDTH } from "@/constants/common";
import React from "react";
import styled from "styled-components";
import Header from "@/components/Header";
import ToolBox from "@/components/ToolBox";

interface AppLayoutProps {
  children: React.ReactNode;
}

const SampleLeft = () => {
  return <h1>musbi</h1>;
};

const SampleRight = () => {
  return (
    <div>
      <span>Menu 1</span>
      <span>Menu 2</span>
    </div>
  );
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <StyledLayout>
      <Header left={<SampleLeft />} right={<SampleRight />} />
      <ToolBox />
      <StyledMainContainer>{children}</StyledMainContainer>
    </StyledLayout>
  );
};

export default AppLayout;

const StyledLayout = styled.div`
  width: 100%;
  height: 100vh;
`;

const StyledMainContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding-top: ${HEADER_HEIGHT}px;
  padding-left: ${TOOLBOX_WIDTH}px;
`;
