import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useBodyCanvas } from '@/feat-components/editor/BodyCanvas/hooks/useBodyCanvas';
import TextLayer from '@/feat-components/editor/TextLayer/TextLayer';

interface BodyCanvasProps {
  contents?: any[];
}

const BodyCanvas = ({ contents }: BodyCanvasProps) => {
  const { isFocus, center } = useBodyCanvas();
  const renderer = useCallback(
    (contents: any[]) => {
      return contents?.map((layer) => {
        if (layer.type === 'TEXT') {
          return <TextLayer key={layer.id} center={center} {...layer} />;
        }

        if (layer.type === 'BACKGROUND') {
          return <div>배경</div>;
        }
      });
    },
    [contents],
  );

  return (
    <StyledBodyCanvasContainer>
      <StyledCanvasLabel>본문 페이지</StyledCanvasLabel>
      <StyledCanvasContent isFocus={isFocus} data-canvas-id='body'>
        {renderer(contents || [])}
      </StyledCanvasContent>
    </StyledBodyCanvasContainer>
  );
};

export default BodyCanvas;

const StyledCanvasContent = styled.div<{ isFocus: boolean }>`
  ${({ isFocus }) => css`
    position: relative;
    min-height: 844px;
    border: 1px solid #fff;
    background-color: #fff;
    box-shadow: ${isFocus ? '0 3px 6px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.16)' : 'none'};
    overflow: hidden;
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
