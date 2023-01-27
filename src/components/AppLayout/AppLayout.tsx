import React from "react";
import Header from "@/components/Header";
import ToolBox from "@/components/ToolBox";
import Drawer from "@/components/Drawer";
import { useCurrentMenuValue } from "@/recoil/toolbox";
import { useDrawerValue } from "@/recoil/drawer";
import { DRAWER_WIDTH, HEADER_HEIGHT, TOOLBOX_WIDTH } from "@/constants/common";
import styled, { css } from "styled-components";

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
  const { isDrawerOpen } = useDrawerValue();
  const currentMenu = useCurrentMenuValue();
  return (
    <StyledLayout>
      <Header left={<SampleLeft />} right={<SampleRight />} />
      <ToolBox />
      <div>
        <StyledMainContainer isDrawerOpen={isDrawerOpen}>
          {children}
        </StyledMainContainer>

        {isDrawerOpen && <Drawer currentMenu={currentMenu} />}
      </div>
    </StyledLayout>
  );
};

export default AppLayout;

const StyledLayout = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: #f1f1f2;
`;

const StyledMainContainer = styled.div<{ isDrawerOpen: boolean }>`
  ${({ isDrawerOpen }) => css`
    width: 100%;
    height: 100%;
    padding-top: ${HEADER_HEIGHT}px;
    padding-right: ${isDrawerOpen
      ? TOOLBOX_WIDTH + DRAWER_WIDTH
      : TOOLBOX_WIDTH}px;
  `}
`;
