import React from 'react';
import styled, { css } from 'styled-components';
import { useBodyCanvas } from '@/feat-components/editor/BodyCanvas/hooks/useBodyCanvas';

interface BodyCanvasProps {
  contents?: any[];
}

const BodyCanvas = ({ contents }: BodyCanvasProps) => {
  const { isFocus } = useBodyCanvas();

  return (
    <StyledBodyCanvasContainer>
      <StyledCanvasLabel>본문 페이지</StyledCanvasLabel>
      <StyledCanvasContent isFocus={isFocus} data-canvas-id='body'>
        lorem*50
      </StyledCanvasContent>
    </StyledBodyCanvasContainer>
  );
};

export default BodyCanvas;

const StyledCanvasContent = styled.div<{ isFocus: boolean }>`
  ${({ isFocus }) => css`
    min-height: 844px;
    border: 1px solid #fff;
    background-color: #fff;
    box-shadow: ${isFocus ? '0 3px 6px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.16)' : 'none'};
  `}
`;

const StyledCanvasLabel = styled.div`
  ${({ theme }) => css`
    padding: 8px 5px;
    color: ${theme.color.lightGray};
    font-size: ${theme.font.label.large}
  `}
`;

const StyledBodyCanvasContainer = styled.div`
    width: 390px;
    margin: 60px auto;
`;
