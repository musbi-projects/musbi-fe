import React from 'react';
import { useCoverCanvas } from '@/feat-components/editor/CoverCanvas/hooks/useCoverCanvas';
import styled, { css } from 'styled-components';

interface CoverCanvasProps {
  contents?: any[];
}

const CoverCanvas = ({ contents }: CoverCanvasProps) => {
  const { isFocus } = useCoverCanvas();
  return (
    <>
      <StyledCoverCanvasContainer>
        <StyledCanvasLabel>첫 페이지</StyledCanvasLabel>
        <StyledCanvasContent isFocus={isFocus} data-canvas-id='cover'>
          {contents?.map((layer) => (
            <>{JSON.stringify(layer, null, 2)}</>
          ))}
        </StyledCanvasContent>
      </StyledCoverCanvasContainer>
    </>
  );
};

export default CoverCanvas;

const StyledCanvasContent = styled.div<{ isFocus: boolean }>`
  ${({ isFocus }) => css`
    height: 844px;
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

const StyledCoverCanvasContainer = styled.div`
    width: 390px;
    margin: 60px auto;
`;
