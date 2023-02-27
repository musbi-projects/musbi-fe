import React from 'react';
import Header from '@/components/Header';
import ToolBox from '@/feat-components/editor/ToolBox';
import BodyCanvas from '@/feat-components/editor/BodyCanvas';
import CoverCanvas from '@/feat-components/editor/CoverCanvas';
import EditorStatus from '@/feat-components/editor/EditorStatus';
import DrawerContainer from '@/feat-components/editor/DrawerContainer';
import { useEditorPage } from '@/feat-components/editor/hooks/useEditorPage';
import { DRAWER_WIDTH, HEADER_HEIGHT, TOOLBOX_WIDTH } from '@/constants';
import styled from 'styled-components';

const EditorPage = () => {
  const { editorViewContents, currentMenu } = useEditorPage();
  console.log('[contents]', editorViewContents);

  return (
    <>
      <Header />
      <main>
        <ToolBox />
        <StyledContentContainer>
          <EditorStatus />
          <CoverCanvas contents={editorViewContents?.cover?.contents} />
          <BodyCanvas contents={editorViewContents?.body?.contents} />
        </StyledContentContainer>
        <DrawerContainer currentMenu={currentMenu} />
      </main>
    </>
  );
};

export default EditorPage;

const StyledContentContainer = styled.div`
  width: calc(100% - ${TOOLBOX_WIDTH + DRAWER_WIDTH}px);
  background-color: #f1f1f2;
  padding-top: ${HEADER_HEIGHT}px;
  padding-bottom: 50%;
`;
