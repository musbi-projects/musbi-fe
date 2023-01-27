import React from "react";
import Header from "@/components/Header";
import ToolBox from "@/feat-components/editor/ToolBox";
import DrawerContainer from "@/feat-components/editor/DrawerContainer";
import { useCurrentMenuValue } from "@/recoil/toolbox";
import { DRAWER_WIDTH, HEADER_HEIGHT, TOOLBOX_WIDTH } from "@/constants";
import styled from "styled-components";

const SampleLeft = () => {
  return <h1>musbi - editor page</h1>;
};

const SampleRight = () => {
  return (
    <div>
      <span>Menu 1</span>
      <span>Menu 2</span>
    </div>
  );
};

const EditorPage = () => {
  const currentMenu = useCurrentMenuValue();

  return (
    <>
      <Header left={<SampleLeft />} right={<SampleRight />} />
      <ToolBox />
      <div>
        <StyledContentContainer>
          <h1>에디터 페이지</h1>
        </StyledContentContainer>
        <DrawerContainer currentMenu={currentMenu} />
      </div>
    </>
  );
};

export default EditorPage;

const StyledContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: ${HEADER_HEIGHT}px;
  padding-right: ${TOOLBOX_WIDTH + DRAWER_WIDTH}px;
`;
