import React from 'react';
import { DRAWER_WIDTH, TOOLBOX_WIDTH } from '@/constants';
import { useCanvasValue } from '@/recoil/canvas';
import styled, { css } from 'styled-components';

const EditorStatus = () => {
  const { currentCanvas } = useCanvasValue();
  // console.log('[currentCanvas]', currentCanvas);

  return <StyledEditorStatus>canvas: {currentCanvas} / layer: oooo</StyledEditorStatus>;
};

export default EditorStatus;

const StyledEditorStatus = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.body.small};
    position: fixed;
    text-align: right;
    bottom: 0;
    width: calc(100% - ${TOOLBOX_WIDTH + DRAWER_WIDTH}px);
    padding: 2px 10px;
    color: #fff;
    font-weight: 300;
    background-color: #2c2c2c;
    z-index: 1000;
  `}
`;
